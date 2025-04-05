
import React from 'react';
import { Button } from '@/components/ui/button';

const NewsletterSignup: React.FC = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="bg-gray-100 rounded-xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Mailing List</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get updates on new releases, exclusive offers, and custom design inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <Button className="bg-purple-700 hover:bg-purple-800">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
