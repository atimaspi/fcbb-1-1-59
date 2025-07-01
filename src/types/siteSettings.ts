
export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_name: string;
  description?: string;
  setting_type?: string;
}

export interface SiteSettingsFormData {
  [key: string]: string;
}
