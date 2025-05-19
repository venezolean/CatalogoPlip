import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product, CATEGORY_COLORS } from '../types';
import { formatCurrency } from '../utils/format';

interface BudgetProductCardProps {
  product: Product;
  onUpdate: (product: Product, quantity: number, unitPrice: number) => void;
  selected?: Product & { quantity: number; unitPrice: number };
}

const BudgetProductCard: React.FC<BudgetProductCardProps> = ({ product, onUpdate, selected }) => {
  const [quantity, setQuantity] = useState(selected?.quantity || 0);
  const [unitPrice, setUnitPrice] = useState(selected?.unitPrice || 0);

  useEffect(() => {
    setQuantity(selected?.quantity || 0);
    setUnitPrice(selected?.unitPrice || 0);
  }, [selected]);

  const handleQuantityChange = (newQuantity: number) => {
    const updatedQuantity = Math.max(0, newQuantity);
    setQuantity(updatedQuantity);
    onUpdate(product, updatedQuantity, unitPrice);
  };

  const handlePriceChange = (newPrice: number) => {
    const updatedPrice = Math.max(0, newPrice);
    setUnitPrice(updatedPrice);
    onUpdate(product, quantity, updatedPrice);
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.image_url && (
        <div className="h-40 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio unitario</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={unitPrice || ''}
              onChange={(e) => handlePriceChange(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingrese precio"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-1 rounded-md text-white"
                style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-1 rounded-md text-white"
                style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {quantity > 0 && unitPrice > 0 && (
            <div className="text-right text-sm font-medium">
              Subtotal: {formatCurrency(quantity * unitPrice)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetProductCard;