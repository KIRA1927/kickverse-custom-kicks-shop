
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { products } from '@/data/products';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsSearchOpen(false);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length >= 2) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-purple-700">KickVerse</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple-700 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-purple-700 transition-colors">
              Shop
            </Link>
            <Link to="/customize" className="text-gray-700 hover:text-purple-700 transition-colors">
              Customize
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700 transition-colors">
              About
            </Link>
          </nav>

          {/* Search, Cart, User - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-purple-700 transition-colors"
              >
                <Search size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-white shadow-lg rounded-md p-2">
                  <form onSubmit={handleSearch} className="flex">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearchInput}
                      className="w-full p-2 border rounded-l focus:outline-none focus:border-purple-500"
                      autoFocus
                    />
                    <Button type="submit" variant="default" className="rounded-l-none">
                      <Search size={18} />
                    </Button>
                  </form>
                  {searchResults.length > 0 && (
                    <div className="mt-2 max-h-60 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => {
                            setSearchTerm('');
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="ml-2">
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-gray-600 hover:text-purple-700 transition-colors relative">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-gray-600 hover:text-purple-700 transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* User */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <Link to="/cart" className="p-2 text-gray-600 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4">
          <div className="flex flex-col space-y-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchInput}
                className="w-full p-2 border rounded-l focus:outline-none focus:border-purple-500"
              />
              <Button type="submit" variant="default" className="rounded-l-none">
                <Search size={18} />
              </Button>
            </form>
            {searchResults.length > 0 && (
              <div className="max-h-40 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setSearchTerm('');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="ml-2">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Navigation */}
            <Link to="/" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              Shop
            </Link>
            <Link to="/customize" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              Customize
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-purple-700 transition-colors py-2 flex items-center" onClick={toggleMenu}>
              Wishlist <Heart size={16} className="ml-2" />
              {wishlistItems.length > 0 && (
                <Badge variant="secondary" className="ml-2">{wishlistItems.length}</Badge>
              )}
            </Link>

            {/* User Actions */}
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
                  Profile
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
                  Orders
                </Link>
                <Button variant="ghost" onClick={() => { signOut(); toggleMenu(); }} className="justify-start p-0 h-auto">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
