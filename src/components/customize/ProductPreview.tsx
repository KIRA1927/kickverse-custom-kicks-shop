
import React from 'react';
import { Product } from '@/types/product';

interface ProductPreviewProps {
  product: Product | null;
  selectedColor: string | null;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ 
  product, 
  selectedColor 
}) => {
  return (
    <div className="relative">
      <div 
        className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center"
        style={{ backgroundColor: selectedColor || 'white' }}
      >
        {product && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-contain h-full w-full mix-blend-multiply"
          />
        )}
      </div>
    </div>
  );
};

export default ProductPreview;
