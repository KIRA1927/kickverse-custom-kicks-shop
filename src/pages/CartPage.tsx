
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Plus, Minus, ArrowRight, FileText } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = React.useState('');
  
  // Sample shipping fee
  const shippingFee = totalAmount > 100 ? 0 : 10;
  const isEligibleForFreeShipping = totalAmount > 100;

  const handleQuantityChange = (productId: string, delta: number, currentQty: number) => {
    if (delta < 0 && currentQty <= 1) {
      return;
    }
    
    const product = getProductById(productId);
    if (product && delta > 0 && currentQty >= product.inStock) {
      toast.error(`Sorry, only ${product.inStock} items available in stock`);
      return;
    }
    
    updateQuantity(productId, currentQty + delta);
  };

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      toast.error('Invalid promo code');
      setPromoCode('');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Cart Items ({totalItems})
                  </h2>
                  <div className="space-y-6">
                    {cartItems.map((item) => {
                      const product = getProductById(item.productId);
                      return (
                        <div key={item.productId} className="flex flex-col sm:flex-row border-b pb-6">
                          {/* Product Image */}
                          <div className="w-full sm:w-28 h-28 mr-6 mb-4 sm:mb-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                              <Link 
                                to={`/product/${item.productId}`}
                                className="text-lg font-medium text-gray-900 hover:text-purple-700"
                              >
                                {item.name}
                              </Link>
                              <span className="text-lg font-semibold text-purple-700">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                            
                            {(item.size || item.color) && (
                              <div className="text-sm text-gray-600 mb-3">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && ' | '}
                                {item.color && `Color: ${item.color}`}
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleQuantityChange(item.productId, -1, item.quantity)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="mx-3 min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.productId, 1, item.quantity)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                                  disabled={product?.inStock === item.quantity}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className="flex items-center text-gray-500 hover:text-red-600"
                              >
                                <Trash size={18} className="mr-1" />
                                <span className="text-sm hidden sm:inline">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {isEligibleForFreeShipping ? 'Free' : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    
                    {isEligibleForFreeShipping && (
                      <div className="text-green-600 text-sm">
                        You've qualified for free shipping!
                      </div>
                    )}
                    
                    {/* Promo Code */}
                    <div className="pt-4">
                      <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" variant="outline">Apply</Button>
                      </form>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-purple-700">
                        ${(totalAmount + shippingFee).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-6 flex flex-col gap-3">
                    <Link to="/products" className="flex items-center justify-center text-purple-700 hover:underline">
                      <ArrowRight size={16} className="rotate-180 mr-1" />
                      Continue Shopping
                    </Link>
                    
                    <div className="flex justify-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        Terms & Conditions
                      </span>
                      <span className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        Privacy Policy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-sm font-medium mb-4">We Accept</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 w-12 bg-blue-100 rounded flex items-center justify-center text-xs font-medium">VISA</div>
                    <div className="h-8 w-12 bg-red-100 rounded flex items-center justify-center text-xs font-medium">MC</div>
                    <div className="h-8 w-12 bg-green-100 rounded flex items-center justify-center text-xs font-medium">AMEX</div>
                    <div className="h-8 w-12 bg-yellow-100 rounded flex items-center justify-center text-xs font-medium">DISC</div>
                    <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">PYPL</div>
                    <div className="h-8 w-12 bg-orange-100 rounded flex items-center justify-center text-xs font-medium">COD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
