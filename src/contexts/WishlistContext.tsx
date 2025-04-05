
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { user } = useAuth();

  // Load wishlist items from localStorage or database
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (data) {
            setWishlistItems(data);
          }
        } catch (error) {
          console.error('Error loading wishlist:', error);
          toast.error('Failed to load wishlist');
          // Fallback to localStorage if database fails
          const localWishlist = localStorage.getItem(`wishlist_${user.id}`);
          if (localWishlist) {
            setWishlistItems(JSON.parse(localWishlist));
          }
        }
      } else {
        // For non-authenticated users, use localStorage
        const localWishlist = localStorage.getItem('guest_wishlist');
        if (localWishlist) {
          setWishlistItems(JSON.parse(localWishlist));
        }
      }
    };

    loadWishlist();
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems));
    } else {
      localStorage.setItem('guest_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToWishlist = async (product: WishlistItem) => {
    try {
      // Check if item is already in wishlist
      if (isInWishlist(product.productId)) {
        toast.info('Product is already in your wishlist');
        return;
      }

      if (user) {
        // Add to database if user is logged in
        const { error } = await supabase.from('wishlist').insert({
          user_id: user.id,
          product_id: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          size: product.size,
          color: product.color,
        });

        if (error) {
          throw error;
        }
      }

      // Update state
      setWishlistItems(prev => [...prev, product]);
      toast.success('Added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      if (user) {
        // Remove from database if user is logged in
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) {
          throw error;
        }
      }

      // Update state
      setWishlistItems(prev => prev.filter(item => item.productId !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    if (user) {
      localStorage.removeItem(`wishlist_${user.id}`);
    } else {
      localStorage.removeItem('guest_wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
