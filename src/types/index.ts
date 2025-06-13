export type ProductCategory =
  | 'embalaje'
  | 'yoga_fitness'
  | 'encuadernacion'
  | 'blanqueria'
  | 'perfumeria'
  | 'otros';
export interface ProductVariant {
  name: string;
  image_url: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  image_url: string;
  variants: ProductVariant[]; 
}

export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  embalaje:       '#0257a4',
  yoga_fitness:   '#92d4fa',
  encuadernacion: '#2a9134',
  blanqueria:     '#ffc220',
  perfumeria:     '#ff914d',
  otros:          '#888888',
};

export const CATEGORY_NAMES: Record<ProductCategory, string> = {
  embalaje:       'Embalaje',
  yoga_fitness:   'Yoga y Fitness',
  encuadernacion: 'Encuadernación',
  blanqueria:     'Blanquería',
  perfumeria:     'Perfumería',
  otros:          'Otros',
};
