import React from 'react';
import { ProductCategory, CATEGORY_COLORS, CATEGORY_NAMES } from '../types';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const categories = Object.keys(CATEGORY_COLORS) as ProductCategory[];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Filtrar por Categoría</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === null
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category
                ? `bg-[${CATEGORY_COLORS[category]}] text-white`
                : `bg-opacity-20 bg-[${CATEGORY_COLORS[category]}] hover:bg-opacity-30`
            }`}
            style={{ 
              backgroundColor: selectedCategory === category 
                ? CATEGORY_COLORS[category] 
                : `${CATEGORY_COLORS[category]}20`,
              color: selectedCategory === category 
                ? 'white' 
                : '#333',
              borderWidth: '1px',
              borderColor: CATEGORY_COLORS[category]
            }}
          >
            {CATEGORY_NAMES[category]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;