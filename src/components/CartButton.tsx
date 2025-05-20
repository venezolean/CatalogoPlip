import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { config } from '../config';

const CartButton: React.FC = () => {
  const { items, total } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);
  
  useEffect(() => {
    if (total === 1 && prevTotal === 0) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 8000);
    }
    if (total !== prevTotal) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }
    setPrevTotal(total);
  }, [total, prevTotal]);

  const handleWhatsAppClick = () => {
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const message = items
      .map(item => `• ${item.quantity}x ${item.product.name}`)
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Me gustaría hacer un pedido:\n\n${message}\n\nPor favor, ¿podrían darme más información?`
    );
    
    window.open(`https://wa.me/${config.whatsapp.phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6">
      {showMessage && (
<div className="absolute bottom-full right-2 mb-4 p-4 bg-white text-black rounded-xl shadow-lg w-56 animate-fade-in">
  <div className="relative">
    {/* Flechita del tooltip */}
    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45"></div>
    <p className="text-sm">
              ¡Siiiii! 🎉 ¡Qué alegría, agregaste tu primer producto! Vamos por más... 😄🛒
            </p>
          </div>
        </div>
      )}
      <button
        onClick={handleWhatsAppClick}
        className={`bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center ${
          animate ? 'scale-125' : 'scale-100'
        }`}
      >
        <ShoppingCart className="w-6 h-6" />
        {total > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {total}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;