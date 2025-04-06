
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getCustomizableProducts } from '@/data/products';
import Layout from '@/components/Layout/Layout';
import { Product } from '@/types/product';
import { toast } from '@/components/ui/use-toast';

// Import our new components
import ColorSelector from '@/components/customize/ColorSelector';
import SizeSelector from '@/components/customize/SizeSelector';
import ProductPreview from '@/components/customize/ProductPreview';
import ProductSelector from '@/components/customize/ProductSelector';

const CustomizePage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>('white');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [customizableProducts, setCustomizableProducts] = useState<Product[]>([]);
  
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
          <ProductPreview product={product} selectedColor={selectedColor} />
          
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product ? `Customize ${product.name}` : 'Choose a Product to Customize'}
            </h1>
            
            {!productId && customizableProducts.length > 0 && (
              <ProductSelector
                products={customizableProducts}
                selectedProduct={product}
                onProductSelect={setProduct}
              />
            )}
            
            <Tabs defaultValue="color">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="color" className="flex-1">Color</TabsTrigger>
                <TabsTrigger value="size" className="flex-1">Size</TabsTrigger>
              </TabsList>
              
              <TabsContent value="color">
                <ColorSelector
                  selectedColor={selectedColor}
                  onColorSelect={handleColorSelect}
                />
              </TabsContent>
              
              <TabsContent value="size">
                {product && (
                  <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                  />
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
