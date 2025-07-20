import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setSearchTerm(query);
    performSearch(query);
  }, [query]);

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase()) ||
      product.brand.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Search Products</h1>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Search Results for "{query}"
            </h2>
            <p className="text-gray-600">
              {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try searching with different keywords or check your spelling
            </p>
            <Button onClick={() => setSearchParams({})}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start searching
            </h3>
            <p className="text-gray-500">
              Enter a search term above to find products
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;