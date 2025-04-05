
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, viewAllLink }) => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to={viewAllLink} className="flex items-center text-purple-700 hover:underline">
          View All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
