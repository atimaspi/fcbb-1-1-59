
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
  isActive: boolean;
}

export interface SubMenuItem {
  label: string;
  link: string;
}
