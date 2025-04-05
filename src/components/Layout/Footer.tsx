
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">KickVerse</h2>
            <p className="mb-4">
              Your destination for premium customized Nike sneakers. Express your 
              style with our unique collection or design your own perfect pair.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">All Products</Link>
              </li>
              <li>
                <Link to="/customize" className="text-gray-400 hover:text-white">Customize</Link>
              </li>
              <li>
                <Link to="/products?category=Running" className="text-gray-400 hover:text-white">Running</Link>
              </li>
              <li>
                <Link to="/products?category=Basketball" className="text-gray-400 hover:text-white">Basketball</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white">Size Guide</Link>
              </li>
              <li>
                <Link to="/tracking" className="text-gray-400 hover:text-white">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
          <p>© {new Date().getFullYear()} KickVerse. All rights reserved.</p>
          <p className="mt-1">
            KickVerse is not affiliated with Nike Inc. All product names, logos, and brands are 
            property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
