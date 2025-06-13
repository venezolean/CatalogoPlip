import React, { useState, useMemo, useEffect } from 'react';
import { MessageCircle, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Obtener variantes del campo adecuado
  const variants: ProductVariant[] = Array.isArray((product as any).variant_names)
    ? (product as any).variant_names
    : [];

  // Variante seleccionada
  const selectedVariant = useMemo(
    () => variants[selectedVariantIdx] || null,
    [variants, selectedVariantIdx]
  );

  // Carrito
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  // Navegar variantes
  const prevVariant = () => {
    setSelectedVariantIdx(i => (i - 1 + variants.length) % variants.length);
    setShowQuantityControls(false);
  };
  const nextVariant = () => {
    setSelectedVariantIdx(i => (i + 1) % variants.length);
    setShowQuantityControls(false);
  };

  // Acciones
  const handleWhatsAppClick = () => {
    const variantText = selectedVariant ? ` Variante: ${selectedVariant.name}.` : '';
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto "${product.name}".${variantText} ¿Podrían darme más información?`
    );
    window.open(`https://wa.me/${config.whatsapp.phoneNumber}?text=${message}`, '_blank');
  };
  const handleAddToCart = () => {
    addToCart(product);
    setShowQuantityControls(true);
  };
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
    if (newQuantity === 0) setShowQuantityControls(false);
  };

  // Mostrar imagen y descripción
  const displayImage = selectedVariant?.image_url || product.image_url;
  const displayDescription = selectedVariant?.description || product.description;

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 transition hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative h-40 bg-gray-200 flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${CATEGORY_COLORS[product.category]}10` }}>
        {variants.length > 1 && (
          <>  
            <button onClick={prevVariant} className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow">
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button onClick={nextVariant} className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow">
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
            <div className="absolute bottom-1 right-1 bg-white bg-opacity-75 text-xs px-1 rounded">{selectedVariantIdx+1}/{variants.length}</div>
          </>
        )}
        {displayImage ? (
          <img src={displayImage} alt={`Imagen de ${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''}`} className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-400 text-xl">No imagen</div>
        )}
      </div>
      <div className="p-2">
        <div className="text-xs font-medium inline-block px-2 py-1 rounded-full truncate" style={{ backgroundColor: `${CATEGORY_COLORS[product.category]}20`, color: CATEGORY_COLORS[product.category] }}>
          {product.category.split('_').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}
        </div>
        <h3 className="text-base font-semibold truncate mt-1">{product.name}</h3>
        {selectedVariant && <div className="text-xs text-gray-700 truncate">{selectedVariant.name}</div>}
        <p className="text-gray-600 text-xs line-clamp-1 mt-1 truncate">{displayDescription}</p>
        <div className="flex items-center justify-between mt-2">
          <button onClick={handleWhatsAppClick} className="p-1 bg-[#25D366] hover:bg-[#128C7E] rounded text-white text-xs" title="Pedir info vía WhatsApp">
            <MessageCircle className="w-4 h-4" />
          </button>
          {!showQuantityControls ? (
            <button onClick={handleAddToCart} className="p-1 rounded text-white text-xs flex items-center" style={{ backgroundColor: CATEGORY_COLORS[product.category] }} title="Agregar al carrito">
              <ShoppingCart className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button onClick={()=>handleQuantityChange(quantity-1)} className="p-1 rounded text-white text-xs" style={{ backgroundColor: CATEGORY_COLORS[product.category] }} title="-">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold">{quantity}</span>
              <button onClick={()=>handleQuantityChange(quantity+1)} className="p-1 rounded text-white text-xs" style={{ backgroundColor: CATEGORY_COLORS[product.category] }} title="+">
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
