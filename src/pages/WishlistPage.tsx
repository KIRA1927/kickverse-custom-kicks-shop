
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Trash, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        size: product.sizes[0],
        color: product.colors[0]
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Add some products to your wishlist for future shopping inspiration!
            </p>
            <Link to="/products">
              <Button>
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <Link to={`/product/${item.productId}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link 
                      to={`/product/${item.productId}`}
                      className="block font-medium text-gray-900 hover:text-purple-700 mb-1"
                    >
                      {item.name}
                    </Link>
                    
                    <p className="text-lg font-semibold text-purple-700 mb-3">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex justify-between gap-2">
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleAddToCart(item.productId)}
                      >
                        <ShoppingCart className="mr-1.5 h-4 w-4" />
                        Add to Cart
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(item.productId)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
