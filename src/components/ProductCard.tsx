import React, { useState } from 'react';
import { MessageCircle, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, CATEGORY_COLORS } from '../types';
import { useCart } from '../context/CartContext';
import { config } from '../config';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items, updateQuantity } = useCart();
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto "${product.name}". ¿Podrían darme más información?`
    );
    window.open(`https://wa.me/${config.whatsapp.phoneNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowQuantityControls(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
    if (newQuantity === 0) {
      setShowQuantityControls(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div 
        className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${CATEGORY_COLORS[product.category]}10` }}
      >
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
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
          {product.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
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
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-1 rounded-md text-white"
                style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
  type="number"
  value={quantity}
  min={0}
  onChange={(e) => handleQuantityChange(Number(e.target.value))}
  className="w-12 px-2 py-1 text-center font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-1 rounded-md text-white"
                style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
              >
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