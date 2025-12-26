import { FEATURED_APPS, STATS, PRODUCT_CATEGORIES } from '../constants';
import { FeatureApp, StatItem, ProductCategory } from '../types';

// In a real full-stack app, these would be fetch() calls to your backend API
// e.g., await fetch('https://api.srxhub.com/v1/stats');

export const getFeaturedApps = (): Promise<(FeatureApp & { id: string })[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(FEATURED_APPS);
    }, 500);
  });
};

export const getGlobalStats = (): Promise<StatItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STATS);
    }, 800);
  });
};

export const getAllProducts = (): Promise<ProductCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCT_CATEGORIES);
    }, 300);
  });
};