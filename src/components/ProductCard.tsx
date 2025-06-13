import React, { useState, useMemo, useEffect } from 'react';
import { MessageCircle, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, ProductVariant, CATEGORY_COLORS } from '../types';
import { useCart } from '../context/CartContext';
import { config } from '../config';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items, updateQuantity } = useCart();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  // Log completo del producto para debugging
  useEffect(() => {
    console.log('Full Product Object:', product);
  }, [product]);

  // Asegurar que variants existe
    // Asegurar que variants existe (casteo al tipo correcto)
  const variants: ProductVariant[] = Array.isArray((product as any).variant_names)
    ? (product as any).variant_names
    : [];
  // Log de variantes específico
  useEffect(() => {
    console.log(`Product ID: ${product.id} - Variants array:`, variants);
  }, [variants, product.id]);

  // Variante seleccionada
  const selectedVariant = useMemo(
    () => variants[selectedVariantIdx] || null,
    [variants, selectedVariantIdx]
  );

  // Carrito por producto
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  // Eventos
  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariantIdx(Number(e.target.value));
    setShowQuantityControls(false);
  };

  const handleWhatsAppClick = () => {
    const variantText = selectedVariant ? ` Variante: ${selectedVariant.name}.` : '';
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto "${product.name}".${variantText} ¿Podrían darme más información?`
    );
    window.open(
      `https://wa.me/${config.whatsapp.phoneNumber}?text=${message}`,
      '_blank'
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowQuantityControls(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
    if (newQuantity === 0) setShowQuantityControls(false);
  };

  // Mostrar imagen y descripción según variante
  const displayImage = selectedVariant?.image_url || product.image_url;
  const displayDescription = selectedVariant?.description || product.description;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div
        className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${CATEGORY_COLORS[product.category]}10` }}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={`Imagen de ${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-xl">No imagen</div>
        )}
      </div>
      <div className="p-4">
        <div
          className="text-xs font-medium mb-2 inline-block px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${CATEGORY_COLORS[product.category]}20`,
            color: CATEGORY_COLORS[product.category]
          }}
        >
          {product.category.split('_').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

        {/* Selector de variantes */}
        {variants.length > 0 && (
          <select
            value={selectedVariantIdx}
            onChange={handleVariantChange}
            className="mb-2 w-full border rounded px-2 py-1 text-sm"
          >
            {variants.map((v, idx) => (
              <option key={idx} value={idx}>{v.name}</option>
            ))}
          </select>
        )}

        {/* Nombre de la variante */}
        {selectedVariant && (
          <div className="text-sm text-gray-700 mb-2">
            Variante: <span className="font-medium">{selectedVariant.name}</span>
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{displayDescription}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="py-2 px-4 rounded-md text-white font-medium transition-colors flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pide el tuyo ya</span>
          </button>
          {!showQuantityControls ? (
            <button
              onClick={handleAddToCart}
              className="py-2 px-4 rounded-md text-white font-medium transition-colors flex items-center justify-center gap-2 hover:opacity-90"
              style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => handleQuantityChange(quantity-1)} className="p-1 rounded-md text-white" style={{backgroundColor:CATEGORY_COLORS[product.category]}}>
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                min={0}
                onChange={e=>handleQuantityChange(Number(e.target.value))}
                className="w-12 px-2 py-1 text-center font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={()=>handleQuantityChange(quantity+1)} className="p-1 rounded-md text-white" style={{backgroundColor:CATEGORY_COLORS[product.category]}}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
