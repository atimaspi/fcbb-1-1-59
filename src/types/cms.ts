
// Types para o novo CMS
export interface Menu {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  order_index: number;
  active: boolean;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  children?: Menu[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  gallery_images: string[];
  post_type: 'article' | 'news' | 'announcement' | 'event';
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  author_id?: string;
  category_id?: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  category_id?: string;
  document_type: 'regulation' | 'statute' | 'report' | 'form' | 'general';
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  download_count: number;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Media {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_name: string;
  original_filename: string;
  file_type: 'image' | 'video' | 'audio' | 'document';
  mime_type: string;
  file_size: number;
  width?: number;
  height?: number;
  duration?: number;
  alt_text?: string;
  category_id?: string;
  folder_path: string;
  tags: string[];
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout';
  table_name: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface Backup {
  id: string;
  backup_name: string;
  backup_type: 'manual' | 'automatic' | 'scheduled';
  file_path: string;
  file_size: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_by?: string;
  created_at: string;
  expires_at?: string;
}
