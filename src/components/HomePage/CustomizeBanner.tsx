
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CustomizeBanner: React.FC = () => {
  return (
    <section className="py-16 bg-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Design Your Dream Sneakers</h2>
            <p className="text-lg mb-6">
              Express yourself with our custom design tool. Choose colors, materials, and add personal touches to create your unique pair.
            </p>
            <Link to="/customize">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                Start Designing Now
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 pl-0 md:pl-12">
            <img 
              src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Custom Sneaker Design" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizeBanner;
