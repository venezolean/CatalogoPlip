import { createClient } from '@supabase/supabase-js';
import { Product } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchProducts = async (): Promise<Product[]> => {
  // llamamos al RPC sin genéricos
  const { data, error } = await supabase
    .rpc('conexion_a_catalogo3', null)

  if (error) {
    console.error('Error fetching inventory via RPC:', error)
    throw error
  }

  // forzamos el tipo en TS y devolvemos
  return (data as Product[]) ?? []
}
