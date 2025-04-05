
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Filter, SortDesc, GridIcon, List, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '@/types/product';
import { products } from '@/data/products';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Extract unique values for filters
  const categories = [...new Set(products.map(product => product.category))];
  const brands = [...new Set(products.map(product => product.brand))];
  const sizes = [...new Set(products.flatMap(product => product.sizes))];
  
  // Get filters from URL on initial load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      // Handle search query filtering
    }
  }, [searchParams]);
  
  // Apply filters when they change
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply search query filter
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' is default, no sorting needed
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategories, selectedBrands, selectedSizes, priceRange, sortBy, searchParams]);
  
  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange([0, 200]);
    setSearchParams({});
  };
  
  const toggleFilterMenu = () => {
    setIsFilterOpen(prev => !prev);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                      />
                      <Label 
                        htmlFor={`category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="px-1 py-4">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={200}
                    step={10}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>
              
              {/* Brands */}
              <div>
                <h3 className="font-medium mb-2">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrandFilter(brand)}
                      />
                      <Label 
                        htmlFor={`brand-${brand}`}
                        className="text-sm cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <h3 className="font-medium mb-2">Sizes</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => toggleSizeFilter(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {searchParams.get('q')
                    ? `Search Results for "${searchParams.get('q')}"`
                    : selectedCategories.length === 1
                      ? `${selectedCategories[0]} Sneakers`
                      : "All Products"
                  }
                </h1>
                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Mobile Filter Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="md:hidden"
                  onClick={toggleFilterMenu}
                >
                  <Filter size={16} className="mr-1" />
                  Filters
                  {isFilterOpen ? (
                    <ChevronUp size={16} className="ml-1" />
                  ) : (
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </Button>
                
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-md px-3 border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                
                {/* View Toggle Buttons */}
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-r-none ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <GridIcon size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-l-none ${viewMode === 'list' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="md:hidden bg-white rounded-lg p-4 shadow mb-6">
                <div className="space-y-5">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => toggleCategoryFilter(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="px-1 py-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={200}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div>
                    <h3 className="font-medium mb-2">Brands</h3>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(brand => (
                        <Button
                          key={brand}
                          variant={selectedBrands.includes(brand) ? "default" : "outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => toggleBrandFilter(brand)}
                        >
                          {brand}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div>
                    <h3 className="font-medium mb-2">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(size => (
                        <Button
                          key={size}
                          variant={selectedSizes.includes(size) ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8 text-xs p-0"
                          onClick={() => toggleSizeFilter(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Apply Filters */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={resetFilters}
                    >
                      Clear All
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={toggleFilterMenu}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <Button onClick={resetFilters}>Clear Filters</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row border rounded-lg overflow-hidden bg-white shadow"
                  >
                    <div className="sm:w-48 h-48">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="text-lg font-semibold text-purple-700 mb-2">${product.price.toFixed(2)}</div>
                      <div className="mt-auto flex flex-wrap gap-2">
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                        >
                          <a href={`/product/${product.id}`}>View Details</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
