
export interface PageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  category: string;
  parent_id?: string;
  order_index: number;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  sections?: PageSection[];
}

export interface PageSection {
  id: string;
  page_id: string;
  type: 'hero' | 'content' | 'gallery' | 'stats' | 'news' | 'competitions' | 'teams' | 'documents';
  title: string;
  content: Record<string, any>;
  order_index: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface CreatePageData {
  title: string;
  slug: string;
  content?: string;
  status: 'published' | 'draft' | 'archived';
  category: string;
  parent_id?: string;
  order_index?: number;
  seo_title?: string;
  seo_description?: string;
}

export interface UpdatePageData {
  title?: string;
  slug?: string;
  content?: string;
  status?: 'published' | 'draft' | 'archived';
  category?: string;
  parent_id?: string;
  order_index?: number;
  seo_title?: string;
  seo_description?: string;
}

export interface CreateSectionData {
  page_id: string;
  type: PageSection['type'];
  title: string;
  content?: Record<string, any>;
  order_index?: number;
  visible?: boolean;
}

export interface UpdateSectionData {
  type?: PageSection['type'];
  title?: string;
  content?: Record<string, any>;
  order_index?: number;
  visible?: boolean;
}

export interface SectionType {
  value: string;
  label: string;
  description: string;
}
