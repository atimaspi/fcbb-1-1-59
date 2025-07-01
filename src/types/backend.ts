
// Backend data types for FCBB system

export interface Team {
  id: string;
  name: string;
  club_id?: string;
  category: string;
  division?: string;
  created_at?: string;
}

export interface Club {
  id: string;
  name: string;
  island: string;
  logo_url?: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  website?: string;
  regional_association_id?: string;
  founded_year?: number;
  active?: boolean;
  status?: string;
  created_at?: string;
}

export interface Competition {
  id: string;
  name: string;
  description?: string;
  season: string;
  type: string;
  status: string;
  start_date?: string;
  end_date?: string;
  federation_id?: string;
  regional_association_id?: string;
  created_at?: string;
}

export interface Game {
  id: string;
  competition_id?: string;
  home_team_id?: string;
  away_team_id?: string;
  scheduled_date: string;
  home_score?: number;
  away_score?: number;
  venue?: string;
  status?: string;
  round?: string;
  created_at?: string;
}

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  position?: string;
  team_id?: string;
  jersey_number?: number;
  birth_date?: string;
  age?: number;
  height_cm?: number;
  weight_kg?: number;
  nationality?: string;
  club?: string;
  active?: boolean;
  status?: string;
  created_at?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  category: string;
  status?: string;
  author?: string;
  author_id?: string;
  published?: boolean;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  type: string;
  organizer?: string;
  created_at?: string;
}

export interface Referee {
  id: string;
  first_name: string;
  last_name: string;
  license_number?: string;
  level: string;
  island?: string;
  phone?: string;
  email?: string;
  active?: boolean;
  certified_date?: string;
  created_at?: string;
}

export interface Coach {
  id: string;
  name: string;
  team_id?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  experience_years?: number;
  status?: string;
  created_at?: string;
}

export interface Federation {
  id: string;
  name: string;
  acronym?: string;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  website?: string;
  foundation_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegionalAssociation {
  id: string;
  name: string;
  acronym?: string;
  island?: string;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  federation_id: string;
  created_at?: string;
  updated_at?: string;
}
