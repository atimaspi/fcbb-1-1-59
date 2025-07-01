
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  type: string;
  organizer?: string;
}

const UpcomingEventsSection = () => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(4);

      if (error) throw error;
      return data as Event[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="cv-container">
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !events || events.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="cv-container">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
            <p className="text-gray-600">
              Nenhum evento programado. Adicione eventos através do Painel Administrativo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="cv-container">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Próximos Eventos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-3">
                <Calendar className="w-5 h-5 text-cv-blue mr-2" />
                <span className="text-sm font-medium text-cv-blue">
                  {format(new Date(event.event_date), 'dd MMM, yyyy', { locale: ptBR })}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {event.title}
              </h3>
              
              {event.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {event.description}
                </p>
              )}
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    {format(new Date(event.event_date), 'HH:mm', { locale: ptBR })}
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
