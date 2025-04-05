
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Quick actions overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 transition-transform translate-y-full group-hover:translate-y-0">
            <div className="flex items-center gap-2 bg-white/90 p-2 rounded-full shadow">
              <Button 
                variant="ghost" 
                size="icon"
                className={`rounded-full ${isWishlisted ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 hover:bg-white/60`}
                onClick={handleAddToWishlist}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full text-gray-600 hover:text-purple-700 hover:bg-white/60"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          <p className="text-lg font-semibold text-purple-700">${product.price.toFixed(2)}</p>
          
          {/* Tags/badges */}
          <div className="mt-2 flex flex-wrap gap-1">
            {product.isCustomizable && (
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                Customizable
              </span>
            )}
            {product.inStock < 10 && (
              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                Low Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
