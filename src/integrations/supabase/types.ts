export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          clicks: number | null
          created_at: string | null
          end_date: string | null
          id: string
          image_url: string | null
          link: string | null
          position: string | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          position?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          position?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      basketball_stats: {
        Row: {
          active: boolean | null
          description: string | null
          icon_name: string | null
          id: string
          order_index: number | null
          stat_key: string
          stat_name: string
          stat_value: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          icon_name?: string | null
          id?: string
          order_index?: number | null
          stat_key: string
          stat_name: string
          stat_value: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          icon_name?: string | null
          id?: string
          order_index?: number | null
          stat_key?: string
          stat_name?: string
          stat_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          event_type: string
          id: string
          location: string | null
          organizer: string | null
          participants: Json | null
          related_championship_id: string | null
          related_game_id: string | null
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_type: string
          id?: string
          location?: string | null
          organizer?: string | null
          participants?: Json | null
          related_championship_id?: string | null
          related_game_id?: string | null
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          location?: string | null
          organizer?: string | null
          participants?: Json | null
          related_championship_id?: string | null
          related_game_id?: string | null
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_related_championship_id_fkey"
            columns: ["related_championship_id"]
            isOneToOne: false
            referencedRelation: "championships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_related_game_id_fkey"
            columns: ["related_game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          product_id: string | null
          quantity: number
          session_id: string
          size: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          session_id: string
          size?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          session_id?: string
          size?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      championship_history: {
        Row: {
          champion_club_id: string | null
          championship_name: string
          created_at: string | null
          id: string
          mvp_player_id: string | null
          notes: string | null
          runner_up_club_id: string | null
          third_place_club_id: string | null
          top_scorer_player_id: string | null
          total_attendance: number | null
          total_games: number | null
          year: number
        }
        Insert: {
          champion_club_id?: string | null
          championship_name: string
          created_at?: string | null
          id?: string
          mvp_player_id?: string | null
          notes?: string | null
          runner_up_club_id?: string | null
          third_place_club_id?: string | null
          top_scorer_player_id?: string | null
          total_attendance?: number | null
          total_games?: number | null
          year: number
        }
        Update: {
          champion_club_id?: string | null
          championship_name?: string
          created_at?: string | null
          id?: string
          mvp_player_id?: string | null
          notes?: string | null
          runner_up_club_id?: string | null
          third_place_club_id?: string | null
          top_scorer_player_id?: string | null
          total_attendance?: number | null
          total_games?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "championship_history_champion_club_id_fkey"
            columns: ["champion_club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championship_history_mvp_player_id_fkey"
            columns: ["mvp_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championship_history_runner_up_club_id_fkey"
            columns: ["runner_up_club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championship_history_third_place_club_id_fkey"
            columns: ["third_place_club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championship_history_top_scorer_player_id_fkey"
            columns: ["top_scorer_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      championships: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          federation_id: string | null
          id: string
          logo_url: string | null
          name: string
          prize_money: number | null
          regional_association_id: string | null
          regulations_url: string | null
          season: string
          sponsors: Json | null
          start_date: string | null
          status: string
          type: string
          venue: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          federation_id?: string | null
          id?: string
          logo_url?: string | null
          name: string
          prize_money?: number | null
          regional_association_id?: string | null
          regulations_url?: string | null
          season: string
          sponsors?: Json | null
          start_date?: string | null
          status?: string
          type?: string
          venue?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          federation_id?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          prize_money?: number | null
          regional_association_id?: string | null
          regulations_url?: string | null
          season?: string
          sponsors?: Json | null
          start_date?: string | null
          status?: string
          type?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "championships_federation_id_fkey"
            columns: ["federation_id"]
            isOneToOne: false
            referencedRelation: "federations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championships_regional_association_id_fkey"
            columns: ["regional_association_id"]
            isOneToOne: false
            referencedRelation: "regional_associations"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          achievements: Json | null
          active: boolean | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          documents: Json | null
          founded_year: number | null
          gallery_images: Json | null
          home_venue: string | null
          id: string
          island: string
          logo_url: string | null
          name: string
          president_name: string | null
          regional_association_id: string | null
          secretary_name: string | null
          social_media: Json | null
          status: string | null
          technical_director_name: string | null
          training_facilities: Json | null
          treasurer_name: string | null
          vice_president_name: string | null
          website: string | null
        }
        Insert: {
          achievements?: Json | null
          active?: boolean | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          documents?: Json | null
          founded_year?: number | null
          gallery_images?: Json | null
          home_venue?: string | null
          id?: string
          island: string
          logo_url?: string | null
          name: string
          president_name?: string | null
          regional_association_id?: string | null
          secretary_name?: string | null
          social_media?: Json | null
          status?: string | null
          technical_director_name?: string | null
          training_facilities?: Json | null
          treasurer_name?: string | null
          vice_president_name?: string | null
          website?: string | null
        }
        Update: {
          achievements?: Json | null
          active?: boolean | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          documents?: Json | null
          founded_year?: number | null
          gallery_images?: Json | null
          home_venue?: string | null
          id?: string
          island?: string
          logo_url?: string | null
          name?: string
          president_name?: string | null
          regional_association_id?: string | null
          secretary_name?: string | null
          social_media?: Json | null
          status?: string | null
          technical_director_name?: string | null
          training_facilities?: Json | null
          treasurer_name?: string | null
          vice_president_name?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_regional_association_id_fkey"
            columns: ["regional_association_id"]
            isOneToOne: false
            referencedRelation: "regional_associations"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          achievements: Json | null
          active: boolean | null
          birth_date: string | null
          coaching_level: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          current_club_id: string | null
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          license_expiry: string | null
          license_number: string | null
          nationality: string | null
          photo_url: string | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          achievements?: Json | null
          active?: boolean | null
          birth_date?: string | null
          coaching_level?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          current_club_id?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          license_expiry?: string | null
          license_number?: string | null
          nationality?: string | null
          photo_url?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          achievements?: Json | null
          active?: boolean | null
          birth_date?: string | null
          coaching_level?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          current_club_id?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          license_expiry?: string | null
          license_number?: string | null
          nationality?: string | null
          photo_url?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coaches_current_club_id_fkey"
            columns: ["current_club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          event_date: string
          id: string
          location: string | null
          organizer: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date: string
          id?: string
          location?: string | null
          organizer?: string | null
          title: string
          type?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date?: string
          id?: string
          location?: string | null
          organizer?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      federations: {
        Row: {
          acronym: string | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          foundation_date: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          foundation_date?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          foundation_date?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          auto_publish: boolean | null
          created_at: string | null
          description: string | null
          event: string | null
          id: string
          image_count: number | null
          published_at: string | null
          scheduled_publish_at: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          auto_publish?: boolean | null
          created_at?: string | null
          description?: string | null
          event?: string | null
          id?: string
          image_count?: number | null
          published_at?: string | null
          scheduled_publish_at?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          auto_publish?: boolean | null
          created_at?: string | null
          description?: string | null
          event?: string | null
          id?: string
          image_count?: number | null
          published_at?: string | null
          scheduled_publish_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string | null
          file_size: number | null
          gallery_id: string | null
          height: number | null
          id: string
          image_url: string
          order_index: number | null
          thumbnail_url: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          gallery_id?: string | null
          height?: number | null
          id?: string
          image_url: string
          order_index?: number | null
          thumbnail_url?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          gallery_id?: string | null
          height?: number | null
          id?: string
          image_url?: string
          order_index?: number | null
          thumbnail_url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "gallery"
            referencedColumns: ["id"]
          },
        ]
      }
      game_results: {
        Row: {
          away_team_score: number
          created_at: string | null
          end_time: string | null
          game_id: string | null
          game_status: string | null
          home_team_score: number
          id: string
          player_stats: Json | null
          quarter_scores: Json | null
          referee_id: string | null
          start_time: string | null
          team_stats: Json | null
          updated_at: string | null
        }
        Insert: {
          away_team_score?: number
          created_at?: string | null
          end_time?: string | null
          game_id?: string | null
          game_status?: string | null
          home_team_score?: number
          id?: string
          player_stats?: Json | null
          quarter_scores?: Json | null
          referee_id?: string | null
          start_time?: string | null
          team_stats?: Json | null
          updated_at?: string | null
        }
        Update: {
          away_team_score?: number
          created_at?: string | null
          end_time?: string | null
          game_id?: string | null
          game_status?: string | null
          home_team_score?: number
          id?: string
          player_stats?: Json | null
          quarter_scores?: Json | null
          referee_id?: string | null
          start_time?: string | null
          team_stats?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_results_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_results_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          assistant_referee_1_id: string | null
          assistant_referee_2_id: string | null
          attendance: number | null
          away_score: number | null
          away_team_id: string | null
          competition_id: string | null
          created_at: string | null
          highlights_url: string | null
          home_score: number | null
          home_team_id: string | null
          id: string
          live_stream_url: string | null
          referee_id: string | null
          round: string | null
          scheduled_date: string
          status: string | null
          venue: string | null
          weather_conditions: string | null
        }
        Insert: {
          assistant_referee_1_id?: string | null
          assistant_referee_2_id?: string | null
          attendance?: number | null
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          highlights_url?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          live_stream_url?: string | null
          referee_id?: string | null
          round?: string | null
          scheduled_date: string
          status?: string | null
          venue?: string | null
          weather_conditions?: string | null
        }
        Update: {
          assistant_referee_1_id?: string | null
          assistant_referee_2_id?: string | null
          attendance?: number | null
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          highlights_url?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          live_stream_url?: string | null
          referee_id?: string | null
          round?: string | null
          scheduled_date?: string
          status?: string | null
          venue?: string | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_assistant_referee_1_id_fkey"
            columns: ["assistant_referee_1_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_assistant_referee_2_id_fkey"
            columns: ["assistant_referee_2_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "championships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          active: boolean | null
          created_at: string | null
          cta_link: string | null
          cta_text: string | null
          description: string | null
          id: string
          image_url: string
          order_index: number | null
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          image_url: string
          order_index?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      integrations: {
        Row: {
          config: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          last_sync: string | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          config?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media_files: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string | null
          file_path: string
          file_size: number
          filename: string
          id: string
          is_featured: boolean | null
          mime_type: string
          original_filename: string
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          file_path: string
          file_size: number
          filename: string
          id?: string
          is_featured?: boolean | null
          mime_type: string
          original_filename: string
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          is_featured?: boolean | null
          mime_type?: string
          original_filename?: string
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      national_team_callups: {
        Row: {
          callup_date: string
          competition_name: string
          created_at: string | null
          id: string
          jersey_number: number | null
          player_id: string | null
          position: string | null
          status: string | null
          team_category: string
          updated_at: string | null
        }
        Insert: {
          callup_date: string
          competition_name: string
          created_at?: string | null
          id?: string
          jersey_number?: number | null
          player_id?: string | null
          position?: string | null
          status?: string | null
          team_category: string
          updated_at?: string | null
        }
        Update: {
          callup_date?: string
          competition_name?: string
          created_at?: string | null
          id?: string
          jersey_number?: number | null
          player_id?: string | null
          position?: string | null
          status?: string | null
          team_category?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "national_team_callups_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          attachments: Json | null
          author: string | null
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          gallery_images: Json | null
          id: string
          image_url: string | null
          published: boolean | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          attachments?: Json | null
          author?: string | null
          author_id?: string | null
          category?: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          attachments?: Json | null
          author?: string | null
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      official_documents: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          document_type: string
          download_count: number | null
          featured: boolean | null
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type: string
          download_count?: number | null
          featured?: boolean | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string
          download_count?: number | null
          featured?: boolean | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          items: Json
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string | null
          shipping_address: Json
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          items: Json
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string | null
          shipping_address: Json
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: Json
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          content: Json | null
          created_at: string | null
          id: string
          order_index: number | null
          page_id: string
          title: string
          type: string
          updated_at: string | null
          visible: boolean | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          id?: string
          order_index?: number | null
          page_id: string
          title: string
          type: string
          updated_at?: string | null
          visible?: boolean | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          id?: string
          order_index?: number | null
          page_id?: string
          title?: string
          type?: string
          updated_at?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          created_by: string | null
          id: string
          order_index: number | null
          parent_id: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          order_index?: number | null
          parent_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          order_index?: number | null
          parent_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string
          name: string
          order_index: number | null
          website_url: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url: string
          name: string
          order_index?: number | null
          website_url?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string
          name?: string
          order_index?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          assists_per_game: number | null
          blocks_per_game: number | null
          championship_id: string | null
          created_at: string | null
          field_goal_percentage: number | null
          free_throw_percentage: number | null
          games_played: number | null
          id: string
          player_id: string | null
          points_per_game: number | null
          rebounds_per_game: number | null
          steals_per_game: number | null
          three_point_percentage: number | null
          updated_at: string | null
        }
        Insert: {
          assists_per_game?: number | null
          blocks_per_game?: number | null
          championship_id?: string | null
          created_at?: string | null
          field_goal_percentage?: number | null
          free_throw_percentage?: number | null
          games_played?: number | null
          id?: string
          player_id?: string | null
          points_per_game?: number | null
          rebounds_per_game?: number | null
          steals_per_game?: number | null
          three_point_percentage?: number | null
          updated_at?: string | null
        }
        Update: {
          assists_per_game?: number | null
          blocks_per_game?: number | null
          championship_id?: string | null
          created_at?: string | null
          field_goal_percentage?: number | null
          free_throw_percentage?: number | null
          games_played?: number | null
          id?: string
          player_id?: string | null
          points_per_game?: number | null
          rebounds_per_game?: number | null
          steals_per_game?: number | null
          three_point_percentage?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_championship_id_fkey"
            columns: ["championship_id"]
            isOneToOne: false
            referencedRelation: "championships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_transfers: {
        Row: {
          contract_duration: string | null
          created_at: string | null
          from_club_id: string | null
          id: string
          notes: string | null
          player_id: string | null
          season: string
          status: string | null
          to_club_id: string | null
          transfer_date: string
          transfer_fee: number | null
          transfer_type: string
          updated_at: string | null
        }
        Insert: {
          contract_duration?: string | null
          created_at?: string | null
          from_club_id?: string | null
          id?: string
          notes?: string | null
          player_id?: string | null
          season: string
          status?: string | null
          to_club_id?: string | null
          transfer_date: string
          transfer_fee?: number | null
          transfer_type: string
          updated_at?: string | null
        }
        Update: {
          contract_duration?: string | null
          created_at?: string | null
          from_club_id?: string | null
          id?: string
          notes?: string | null
          player_id?: string | null
          season?: string
          status?: string | null
          to_club_id?: string | null
          transfer_date?: string
          transfer_fee?: number | null
          transfer_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_transfers_from_club_id_fkey"
            columns: ["from_club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_transfers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_transfers_to_club_id_fkey"
            columns: ["to_club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          active: boolean | null
          age: number | null
          birth_date: string | null
          club: string | null
          created_at: string | null
          documents: Json | null
          first_name: string
          height_cm: number | null
          id: string
          jersey_number: number | null
          last_name: string
          nationality: string | null
          photo_url: string | null
          position: string | null
          status: string | null
          team_id: string | null
          weight_kg: number | null
        }
        Insert: {
          active?: boolean | null
          age?: number | null
          birth_date?: string | null
          club?: string | null
          created_at?: string | null
          documents?: Json | null
          first_name: string
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          last_name: string
          nationality?: string | null
          photo_url?: string | null
          position?: string | null
          status?: string | null
          team_id?: string | null
          weight_kg?: number | null
        }
        Update: {
          active?: boolean | null
          age?: number | null
          birth_date?: string | null
          club?: string | null
          created_at?: string | null
          documents?: Json | null
          first_name?: string
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          last_name?: string
          nationality?: string | null
          photo_url?: string | null
          position?: string | null
          status?: string | null
          team_id?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          order_index: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          order_index?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          order_index?: number | null
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean | null
          category: string
          colors: Json | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          featured: boolean | null
          featured_image_url: string | null
          gallery_images: Json | null
          id: string
          name: string
          price: number
          sizes: Json | null
          sku: string | null
          stock_quantity: number
          updated_at: string | null
          weight_kg: number | null
        }
        Insert: {
          active?: boolean | null
          category?: string
          colors?: Json | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          name: string
          price: number
          sizes?: Json | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string | null
          weight_kg?: number | null
        }
        Update: {
          active?: boolean | null
          category?: string
          colors?: Json | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          name?: string
          price?: number
          sizes?: Json | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          club_id: string | null
          full_name: string | null
          id: string
          regional_association_id: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          club_id?: string | null
          full_name?: string | null
          id: string
          regional_association_id?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          club_id?: string | null
          full_name?: string | null
          id?: string
          regional_association_id?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_regional_association_id_fkey"
            columns: ["regional_association_id"]
            isOneToOne: false
            referencedRelation: "regional_associations"
            referencedColumns: ["id"]
          },
        ]
      }
      referees: {
        Row: {
          active: boolean | null
          availability: Json | null
          certificates: Json | null
          certified_date: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          first_name: string
          id: string
          island: string | null
          last_name: string
          level: string
          license_number: string | null
          phone: string | null
          photo_url: string | null
          specialties: Json | null
        }
        Insert: {
          active?: boolean | null
          availability?: Json | null
          certificates?: Json | null
          certified_date?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          island?: string | null
          last_name: string
          level: string
          license_number?: string | null
          phone?: string | null
          photo_url?: string | null
          specialties?: Json | null
        }
        Update: {
          active?: boolean | null
          availability?: Json | null
          certificates?: Json | null
          certified_date?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          island?: string | null
          last_name?: string
          level?: string
          license_number?: string | null
          phone?: string | null
          photo_url?: string | null
          specialties?: Json | null
        }
        Relationships: []
      }
      regional_associations: {
        Row: {
          acronym: string | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          federation_id: string
          id: string
          island: string | null
          logo_url: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          federation_id: string
          id?: string
          island?: string | null
          logo_url?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          federation_id?: string
          id?: string
          island?: string | null
          logo_url?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regional_associations_federation_id_fkey"
            columns: ["federation_id"]
            isOneToOne: false
            referencedRelation: "federations"
            referencedColumns: ["id"]
          },
        ]
      }
      site_config: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_name: string
          setting_type: string | null
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_name: string
          setting_type?: string | null
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_name?: string
          setting_type?: string | null
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      standings: {
        Row: {
          championship_id: string | null
          created_at: string | null
          id: string
          losses: number | null
          played: number | null
          points: number | null
          points_against: number | null
          points_for: number | null
          position: number
          team_id: string | null
          updated_at: string | null
          wins: number | null
        }
        Insert: {
          championship_id?: string | null
          created_at?: string | null
          id?: string
          losses?: number | null
          played?: number | null
          points?: number | null
          points_against?: number | null
          points_for?: number | null
          position: number
          team_id?: string | null
          updated_at?: string | null
          wins?: number | null
        }
        Update: {
          championship_id?: string | null
          created_at?: string | null
          id?: string
          losses?: number | null
          played?: number | null
          points?: number | null
          points_against?: number | null
          points_for?: number | null
          position?: number
          team_id?: string | null
          updated_at?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "standings_championship_id_fkey"
            columns: ["championship_id"]
            isOneToOne: false
            referencedRelation: "championships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_logs: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          integration_id: string | null
          message: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          integration_id?: string | null
          message?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          integration_id?: string | null
          message?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          category: string
          club_id: string | null
          created_at: string | null
          division: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          club_id?: string | null
          created_at?: string | null
          division?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          club_id?: string | null
          created_at?: string | null
          division?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_publish_scheduled_galleries: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_orphaned_media: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
