export type ProductCategory = 
  | 'cintas_adhesivas'
  | 'film_stretch_proteccion'
  | 'papeleria_encuadernacion'
  | 'bolsas_papel'
  | 'bolsas_ecommerce';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  image_url: string;
}

export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  cintas_adhesivas: '#0257a4',
  film_stretch_proteccion: '#92d4fa',
  papeleria_encuadernacion: '#2a9134',
  bolsas_papel: '#ffc220',
  bolsas_ecommerce: '#ff914d'
};

export const CATEGORY_NAMES: Record<ProductCategory, string> = {
  cintas_adhesivas: 'Cintas adhesivas',
  film_stretch_proteccion: 'Film stretch y protección',
  papeleria_encuadernacion: 'Papelería y encuadernación',
  bolsas_papel: 'Bolsas de papel',
  bolsas_ecommerce: 'Bolsas e-commerce'
};