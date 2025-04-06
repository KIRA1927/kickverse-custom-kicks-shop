import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Save, RotateCw, Undo, ArrowLeft, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { getProductById, getCustomizableProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

// Color options for customization
const colorOptions = [
  { name: 'Red', value: '#f44336' },
  { name: 'Blue', value: '#2196f3' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Yellow', value: '#ffeb3b' },
  { name: 'Orange', value: '#ff9800' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#ffffff' },
  { name: 'Gray', value: '#9e9e9e' },
];

interface CustomPart {
  id: string;
  name: string;
  color: string;
}

const CustomizePage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [baseProducts, setBaseProducts] = useState<Product[]>([]);
  const [customParts, setCustomParts] = useState<CustomPart[]>([
    { id: 'base', name: 'Base', color: '#ffffff' },
    { id: 'accent', name: 'Accent', color: '#000000' },
    { id: 'sole', name: 'Sole', color: '#9e9e9e' },
    { id: 'laces', name: 'Laces', color: '#000000' },
    { id: 'logo', name: 'Logo', color: '#ff9800' },
  ]);
  const [selectedPart, setSelectedPart] = useState<string>('base');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Load products on mount
  useEffect(() => {
    // Get customizable products
    const products = getCustomizableProducts();
    setBaseProducts(products);
    
    // If productId is provided, set it as selected
    if (productId) {
      const product = getProductById(productId);
      if (product) {
        setSelectedProduct(product);
        if (product.sizes.length > 0) {
          setSelectedSize(product.sizes[0]);
        }
      }
    } else if (products.length > 0) {
      // Otherwise select the first product
      setSelectedProduct(products[0]);
      if (products[0].sizes.length > 0) {
        setSelectedSize(products[0].sizes[0]);
      }
    }
  }, [productId]);

  const handleChangeProduct = (product: Product) => {
    setSelectedProduct(product);
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  };

  const handleColorChange = (colorValue: string) => {
    if (!selectedPart) return;
    
    setCustomParts(prev => 
      prev.map(part => 
        part.id === selectedPart ? { ...part, color: colorValue } : part
      )
    );
  };

  const resetCustomization = () => {
    setCustomParts([
      { id: 'base', name: 'Base', color: '#ffffff' },
      { id: 'accent', name: 'Accent', color: '#000000' },
      { id: 'sole', name: 'Sole', color: '#9e9e9e' },
      { id: 'laces', name: 'Laces', color: '#000000' },
      { id: 'logo', name: 'Logo', color: '#ff9800' },
    ]);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const customizedProduct = {
      productId: selectedProduct.id,
      name: customName || `Custom ${selectedProduct.name}`,
      price: selectedProduct.price + 20, // Add customization fee
      quantity: 1,
      image: selectedProduct.image,
      size: selectedSize,
      color: 'Custom',
      customization: customParts,
    };
    
    addToCart(customizedProduct);
    toast.success('Custom design added to cart');
  };

  const handleSaveToWishlist = () => {
    if (!selectedProduct) return;
    
    const customizedProduct = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      name: customName || `Custom ${selectedProduct.name}`,
      price: selectedProduct.price + 20, // Add customization fee
      image: selectedProduct.image,
      size: selectedSize,
      color: 'Custom',
      customization: customParts,
    };
    
    addToWishlist(customizedProduct);
    toast.success('Custom design saved to wishlist');
  };

  if (!selectedProduct) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <p>Loading customization tools...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Design Your Custom Kicks</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                {/* This would be a 3D model or interactive design in a real app */}
                <div className="relative w-4/5 h-4/5">
                  <img 
                    src={selectedProduct.image} 
                    alt="Customizable Shoe" 
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Colored overlays to simulate customization */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-40" 
                    style={{ backgroundColor: customParts.find(p => p.id === 'base')?.color }}
                  ></div>
                  
                  <div 
                    className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 rounded-full opacity-30" 
                    style={{ backgroundColor: customParts.find(p => p.id === 'accent')?.color }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-center gap-2 mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetCustomization}
                >
                  <RotateCw className="mr-1 h-4 w-4" />
                  Reset Design
                </Button>
                <Button variant="outline" size="sm">
                  <Undo className="mr-1 h-4 w-4" />
                  Undo
                </Button>
              </div>
              
              <h2 className="text-lg font-semibold mb-2">
                {customName || `Custom ${selectedProduct.name}`}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {customParts.map(part => (
                  <div 
                    key={part.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full cursor-pointer ${
                      selectedPart === part.id ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedPart(part.id)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: part.color }}
                    ></div>
                    <span className="text-sm">{part.name}</span>
                  </div>
                ))}
              </div>
              
              <Tabs defaultValue="standard" className="mb-6">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="standard">Standard Colors</TabsTrigger>
                  <TabsTrigger value="custom">Custom Colors</TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard">
                  <div className="grid grid-cols-5 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.name}
                        className={`w-full aspect-square rounded-md border-2 border-solid transition-all ${
                          customParts.find(p => p.id === selectedPart)?.color === color.value
                            ? 'border-purple-600 scale-110 shadow-md'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorChange(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="custom">
                  <div>
                    <input
                      type="color"
                      value={customParts.find(p => p.id === selectedPart)?.color || '#000000'}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-full h-12 rounded-md cursor-pointer"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {/* Base product options */}
                {baseProducts.map((product) => (
                  <button
                    key={product.id}
                    className={`border rounded-md p-2 ${
                      selectedProduct.id === product.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleChangeProduct(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-16 w-full object-contain mb-1"
                    />
                    <span className="text-xs block truncate">{product.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Customization Options */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Your Custom Design</h2>
              
              <div className="space-y-6">
                {/* Custom Name */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Design Name
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={`Custom ${selectedProduct.name}`}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                {/* Size Selection */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Choose Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`py-2 border rounded-md ${
                          selectedSize === size
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Price</span>
                    <span>${selectedProduct.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Customization</span>
                    <span>$20.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(selectedProduct.price + 20).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                  >
                    <ShoppingCart className="mr-1.5 h-4 w-4" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleSaveToWishlist}
                  >
                    <Heart className="mr-1.5 h-4 w-4" />
                    Save Design to Wishlist
                  </Button>
                  
                  <Button variant="ghost">
                    <Save className="mr-1.5 h-4 w-4" />
                    Share Design
                  </Button>
                </div>
                
                {/* Information */}
                <div className="text-sm text-gray-600 space-y-2">
                  <p>✓ Free shipping on orders over $100</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ Custom designs take 7-10 days to manufacture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button variant="outline" asChild>
            <a href="/products">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Products
            </a>
          </Button>
          
          <Button variant="default" asChild>
            <a href="/cart">
              View Cart
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CustomizePage;
