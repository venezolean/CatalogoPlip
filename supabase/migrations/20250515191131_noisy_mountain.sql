/*
  # Create products schema
  
  1. Product Categories
    - Create enum type for product categories
    
  2. Products Table
    - Create products table with necessary fields
    - Ensure image_url only accepts .webp format files
    
  3. Security
    - Enable row level security on products table
    - Add policies for authenticated users
*/

-- 1. Create enum type for categories
CREATE TYPE product_category AS ENUM (
  'cintas_adhesivas',
  'film_stretch_proteccion',
  'papeleria_encuadernacion',
  'bolsas_papel',
  'bolsas_ecommerce'
);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category product_category NOT NULL,
  description TEXT,
  image_url TEXT CHECK (image_url LIKE '%.webp')
);

-- 3. Enable row level security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);