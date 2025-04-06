import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ColorGrid from '@/components/ui/color-grid';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getCustomizableProducts } from '@/data/products';
import Layout from '@/components/Layout/Layout';
import { Product } from '@/types/product';
import { toast } from '@/components/ui/use-toast';

const CustomizePage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>('white');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [customizableProducts, setCustomizableProducts] = useState<Product[]>([]);
  
  const colors = [
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Purple', value: 'purple' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
    { name: 'Gray', value: 'gray' }
  ];
  
  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct && foundProduct.isCustomizable) {
        setProduct(foundProduct);
      } else {
        navigate('/customize');
      }
    } else {
      const customizable = getCustomizableProducts();
      setCustomizableProducts(customizable);
      
      if (customizable.length > 0) {
        setProduct(customizable[0]);
      }
    }
  }, [productId, navigate]);
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      customColor: selectedColor || 'white'
    });
    
    toast({
      title: "Added to cart",
      description: "Your customized product has been added to the cart"
    });
  };
  
  if (!product && customizableProducts.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">No customizable products available</h1>
          <Button onClick={() => navigate('/products')}>Browse All Products</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <div 
              className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center"
              style={{ backgroundColor: selectedColor || 'white' }}
            >
              {product && (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-contain h-full w-full mix-blend-multiply"
                />
              )}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product ? `Customize ${product.name}` : 'Choose a Product to Customize'}
            </h1>
            
            {!productId && customizableProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Select Product</h2>
                <div className="grid grid-cols-2 gap-4">
                  {customizableProducts.map((item) => (
                    <Card 
                      key={item.id}
                      className={`cursor-pointer transition ${product?.id === item.id ? 'ring-2 ring-purple-500' : ''}`}
                      onClick={() => setProduct(item)}
                    >
                      <CardContent className="p-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-32 object-contain mx-auto mb-2"
                        />
                        <h3 className="text-sm font-medium text-center">{item.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <Tabs defaultValue="color">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="color" className="flex-1">Color</TabsTrigger>
                <TabsTrigger value="size" className="flex-1">Size</TabsTrigger>
              </TabsList>
              
              <TabsContent value="color">
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <div key={color.value} className="text-center">
                      <button
                        className={`w-12 h-12 rounded-full ${
                          selectedColor === color.value 
                            ? 'ring-2 ring-offset-2 ring-purple-600' 
                            : 'ring-1 ring-gray-300'
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorSelect(color.value)}
                        aria-label={`Select ${color.name} color`}
                      />
                      <p className="mt-1 text-xs">{color.name}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="size">
                {product && (
                  <RadioGroup 
                    value={selectedSize || ""} 
                    onValueChange={handleSizeSelect}
                    className="grid grid-cols-3 gap-2"
                  >
                    {product.sizes.map((size) => (
                      <div key={size}>
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 peer-data-[state=checked]:text-purple-600 cursor-pointer"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </TabsContent>
            </Tabs>
            
            {product && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">${product.price.toFixed(2)}</h2>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleAddToCart}
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomizePage;
