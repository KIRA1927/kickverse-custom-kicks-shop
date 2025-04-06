
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductSelect: (product: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ 
  products, 
  selectedProduct, 
  onProductSelect 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Select Product</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <Card 
            key={item.id}
            className={`cursor-pointer transition ${selectedProduct?.id === item.id ? 'ring-2 ring-purple-500' : ''}`}
            onClick={() => onProductSelect(item)}
          >
            <CardContent className="p-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-32 object-contain mx-auto mb-2"
              />
              <h3 className="text-sm font-medium text-center">{item.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
