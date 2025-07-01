
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Running scheduled content publication...')

    // Get current timestamp
    const now = new Date().toISOString()

    // Find scheduled publications that are due
    const { data: scheduledPublications, error: scheduleError } = await supabase
      .from('scheduled_publications')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_date', now)

    if (scheduleError) {
      console.error('Error fetching scheduled publications:', scheduleError)
      throw scheduleError
    }

    console.log(`Found ${scheduledPublications?.length || 0} scheduled publications`)

    let publishedCount = 0

    // Process each scheduled publication
    for (const publication of scheduledPublications || []) {
      try {
        // Update the content status to published
        const { error: updateError } = await supabase
          .from(publication.content_type)
          .update({
            status: 'publicado',
            published_at: now,
            updated_at: now
          })
          .eq('id', publication.content_id)

        if (updateError) {
          console.error(`Error publishing ${publication.content_type} ${publication.content_id}:`, updateError)
          continue
        }

        // Mark the scheduled publication as completed
        const { error: completeError } = await supabase
          .from('scheduled_publications')
          .update({ status: 'completed' })
          .eq('id', publication.id)

        if (completeError) {
          console.error(`Error completing scheduled publication ${publication.id}:`, completeError)
          continue
        }

        // Create content history entry
        const { error: historyError } = await supabase
          .from('content_history')
          .insert({
            content_type: publication.content_type,
            content_id: publication.content_id,
            user_id: publication.created_by,
            action: 'published',
            changes: { published_at: now, status: 'publicado' }
          })

        if (historyError) {
          console.error(`Error creating history entry:`, historyError)
        }

        publishedCount++
        console.log(`Published ${publication.content_type} ${publication.content_id}`)

      } catch (error) {
        console.error(`Error processing publication ${publication.id}:`, error)
      }
    }

    console.log(`Successfully published ${publishedCount} items`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Published ${publishedCount} scheduled items`,
        processed: scheduledPublications?.length || 0,
        published: publishedCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in content publisher:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
