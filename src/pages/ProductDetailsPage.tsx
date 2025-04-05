
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import Rating from '@/components/ui/rating';
import { ShoppingCart, Heart, Share2, Minus, Plus, ArrowRight, Check } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (productId) {
      const fetchedProduct = getProductById(productId);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setCurrentImage(fetchedProduct.image);
        
        // Set defaults
        if (fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        
        if (fetchedProduct.colors.length > 0) {
          setSelectedColor(fetchedProduct.colors[0]);
        }
        
        // Get related products
        const related = getRelatedProducts(fetchedProduct.category, productId);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }
  }, [productId]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      size: selectedSize,
      color: selectedColor
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    addToWishlist({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor
    });
  };

  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p>The product you are looking for does not exist.</p>
            <Link to="/products">
              <Button className="mt-6">Browse All Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-purple-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-purple-700">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-purple-700">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Info */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-square overflow-hidden rounded-lg">
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    currentImage === image ? 'border-purple-700' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <Rating value={product.rating} showValue />
              <span className="ml-2 text-sm text-gray-500">({Math.floor(Math.random() * 500) + 100} reviews)</span>
            </div>
            
            <p className="text-2xl font-bold text-purple-700 mb-4">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-9 w-9 rounded-full border ${
                      selectedColor === color
                        ? 'ring-2 ring-purple-700 ring-offset-2'
                        : 'border-gray-300'
                    }`}
                    style={{ 
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                      color.toLowerCase() === 'black' ? '#000000' :
                                      color.toLowerCase() === 'red' ? '#ef4444' :
                                      color.toLowerCase() === 'blue' ? '#3b82f6' :
                                      color.toLowerCase() === 'green' ? '#22c55e' :
                                      color.toLowerCase() === 'yellow' ? '#eab308' :
                                      color.toLowerCase() === 'orange' ? '#f97316' :
                                      color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                      color.toLowerCase() === 'gray' ? '#9ca3af' :
                                      color.toLowerCase() === 'silver' ? '#cbd5e1' :
                                      color.toLowerCase() === 'gold' ? '#fbbf24' :
                                      undefined
                    }}
                  >
                    {selectedColor === color && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check size={16} className={color.toLowerCase() === 'white' ? 'text-black' : 'text-white'} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-purple-700 hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center rounded-md border py-2 ${
                      selectedSize === size
                        ? 'border-purple-700 bg-purple-50 text-purple-700'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center mb-6">
              {product.inStock > 0 ? (
                <>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm text-green-700">In Stock ({product.inStock} available)</span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="ml-2 text-sm text-red-700">Out of stock</span>
                </>
              )}
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-gray-600 hover:text-purple-700"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center w-12">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-gray-600 hover:text-purple-700"
                    disabled={quantity >= product.inStock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={product.inStock <= 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddToWishlist}
                  className={isWishlisted ? 'text-red-500' : ''}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
            
            {/* Customization CTA - show only if product is customizable */}
            {product.isCustomizable && (
              <div className="p-4 bg-purple-50 rounded-lg mb-6">
                <h3 className="text-purple-700 font-medium mb-2">Make It Yours</h3>
                <p className="text-gray-700 text-sm mb-3">
                  This product can be customized with your personal design preferences.
                </p>
                <Link to={`/customize/${product.id}`}>
                  <Button variant="outline" className="text-purple-700 border-purple-700">
                    Customize This Design
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Additional Info */}
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex items-center">
                  <Check size={16} className="text-green-600 mr-1" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <span className="mx-2">•</span>
                <div>30-day return policy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs (Details, Specs, Reviews) */}
      <section className="container mx-auto px-4 py-12 border-t">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b mb-8">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="text-gray-700 space-y-4">
            <p>
              {product.description} Crafted with precision and designed for both comfort and style, 
              these shoes are made to elevate your performance and complement your personal style.
            </p>
            <p>
              With attention to every detail, from cushioned insoles to breathable materials, 
              these Nike sneakers offer the perfect balance of function and fashion.
            </p>
            <h3 className="font-semibold mt-4">Features:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Durable rubber outsole for excellent traction</li>
              <li>Breathable mesh upper for comfort</li>
              <li>Cushioned midsole for responsive feel</li>
              <li>Padded collar and tongue for added comfort</li>
              <li>Signature Nike branding</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Product Specifications</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Brand</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Model</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Category</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Color Options</span>
                    <span>{product.colors.join(', ')}</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Size Range</span>
                    <span>US {Math.min(...product.sizes.map(Number))} - {Math.max(...product.sizes.map(Number))}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Materials & Care</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Upper Material</span>
                    <span>Synthetic Mesh / Leather</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Sole Material</span>
                    <span>Rubber</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Insole</span>
                    <span>Cushioned Foam</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Cleaning</span>
                    <span>Wipe with damp cloth</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Storage</span>
                    <span>Cool, dry place</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Summary */}
                <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <h3 className="text-4xl font-bold text-gray-900">{product.rating.toFixed(1)}</h3>
                    <Rating value={product.rating} size="lg" className="justify-center my-2" />
                    <p className="text-sm text-gray-500">Based on {Math.floor(Math.random() * 500) + 100} reviews</p>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = star === 5 ? 65 :
                                        star === 4 ? 25 :
                                        star === 3 ? 7 :
                                        star === 2 ? 2 : 1;
                      return (
                        <div key={star} className="flex items-center">
                          <span className="text-sm text-gray-600 w-4">{star}</span>
                          <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                            <div 
                              className="h-2 bg-amber-400 rounded" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button className="w-full mt-6">Write a Review</Button>
                </div>
                
                {/* Review Cards */}
                <div className="md:w-2/3 space-y-6">
                  {[
                    {
                      name: "Michael Johnson",
                      rating: 5,
                      date: "2 months ago",
                      title: "Best sneakers I've ever owned",
                      comment: "These shoes are incredibly comfortable and stylish. I've received so many compliments on them. They fit true to size and the quality is outstanding.",
                      recommended: true
                    },
                    {
                      name: "Emma Davis",
                      rating: 4,
                      date: "3 weeks ago",
                      title: "Great shoes, just a bit snug",
                      comment: "Really happy with these sneakers. The design is beautiful and they're well made. I'd recommend going half a size up as they run a bit small.",
                      recommended: true
                    },
                    {
                      name: "Robert Lee",
                      rating: 5,
                      date: "1 month ago",
                      title: "Perfect for running and casual wear",
                      comment: "I use these for both my morning runs and casual outings. They're versatile, comfortable and durable. Definitely worth the money.",
                      recommended: true
                    }
                  ].map((review, idx) => (
                    <div key={idx} className="border-b pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Rating value={review.rating} />
                        <span className="ml-2 font-medium">{review.title}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      {review.recommended && (
                        <div className="flex items-center text-green-700 text-sm">
                          <Check size={16} className="mr-1" />
                          <span>Would recommend</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      <section className="container mx-auto px-4 py-12 border-t">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
          <Link to="/products" className="flex items-center text-purple-700 hover:underline">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetailsPage;
