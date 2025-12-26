
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  hasMenu?: boolean; // Kept for backward compatibility check
  menuType?: 'mega' | 'dropdown';
  subItems?: { label: string; href: string }[];
}

export interface FeatureApp {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isNew?: boolean;
}

export interface ProductCategory {
  id: string;
  label: string;
  products: Product[];
}
