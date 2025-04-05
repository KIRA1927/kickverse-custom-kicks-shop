
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'id'>) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Calculate totals
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Load cart items when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user && isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (data) {
            setCartItems(data);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
          // Fallback to localStorage if database fails
          const localCart = localStorage.getItem(`cart_${user.id}`);
          if (localCart) {
            setCartItems(JSON.parse(localCart));
          }
        }
      } else {
        // For non-authenticated users, use localStorage
        const localCart = localStorage.getItem('guest_cart');
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        } else {
          setCartItems([]);
        }
      }
    };

    loadCart();
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product: Omit<CartItem, 'id'>) => {
    try {
      // Check if item is already in cart
      const existingItemIndex = cartItems.findIndex(item => 
        item.productId === product.productId && 
        item.size === product.size && 
        item.color === product.color
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += product.quantity;

        if (user && isSupabaseConfigured()) {
          // Update in database if user is logged in
          const { error } = await supabase
            .from('cart')
            .update({ quantity: updatedCartItems[existingItemIndex].quantity })
            .eq('id', updatedCartItems[existingItemIndex].id);

          if (error) throw error;
        }

        setCartItems(updatedCartItems);
      } else {
        // Add new item
        const newItem: CartItem = {
          id: crypto.randomUUID(),
          ...product
        };

        if (user && isSupabaseConfigured()) {
          // Add to database if user is logged in
          const { error, data } = await supabase
            .from('cart')
            .insert({
              user_id: user.id,
              product_id: product.productId,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              image: product.image,
              size: product.size,
              color: product.color,
            })
            .select();

          if (error) throw error;
          
          if (data && data.length > 0) {
            newItem.id = data[0].id;
          }
        }

        setCartItems(prev => [...prev, newItem]);
      }

      toast.success('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const itemToRemove = cartItems.find(item => item.productId === productId);
      
      if (user && itemToRemove) {
        // Remove from database if user is logged in
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('id', itemToRemove.id);

        if (error) throw error;
      }

      // Update state
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const updatedCartItems = cartItems.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      const itemToUpdate = updatedCartItems.find(item => item.productId === productId);

      if (user && itemToUpdate) {
        // Update in database if user is logged in
        const { error } = await supabase
          .from('cart')
          .update({ quantity })
          .eq('id', itemToUpdate.id);

        if (error) throw error;
      }

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error('Failed to update cart');
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        // Clear from database if user is logged in
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        
        localStorage.removeItem(`cart_${user.id}`);
      } else {
        localStorage.removeItem('guest_cart');
      }
      
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
