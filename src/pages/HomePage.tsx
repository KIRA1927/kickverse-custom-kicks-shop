
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { getFeaturedProducts, getCustomizableProducts } from '@/data/products';

// Import the new components
import HeroCarousel from '@/components/HomePage/HeroCarousel';
import CategoryGrid from '@/components/HomePage/CategoryGrid';
import ProductSection from '@/components/HomePage/ProductSection';
import CustomizeBanner from '@/components/HomePage/CustomizeBanner';
import FeatureGrid from '@/components/HomePage/FeatureGrid';
import NewsletterSignup from '@/components/HomePage/NewsletterSignup';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const customizableProducts = getCustomizableProducts().slice(0, 4);

  // Data for the carousel
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      title: "Customize Your Perfect Pair",
      description: "Design your own Nike sneakers with our easy-to-use customization tools",
      link: "/customize",
      buttonText: "Start Designing"
    },
    {
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      title: "New Arrivals",
      description: "Check out our latest sneakers with exclusive designs",
      link: "/products",
      buttonText: "Shop Now"
    },
    {
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      title: "Limited Edition Collection",
      description: "Unique custom designs you won't find anywhere else",
      link: "/products?category=limited",
      buttonText: "Explore Collection"
    }
  ];

  // Category data
  const categories = [
    { name: "Running", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { name: "Basketball", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { name: "Casual", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { name: "Custom", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" }
  ];

  // Features data
  const features = [
    {
      title: "Premium Quality",
      description: "All our shoes are made with high-quality materials for comfort and durability.",
      icon: "🌟",
    },
    {
      title: "Custom Designs",
      description: "Create your own unique style with our easy-to-use customization tools.",
      icon: "🎨",
    },
    {
      title: "Fast Shipping",
      description: "Quick delivery with order tracking to keep you updated every step of the way.",
      icon: "🚚",
    }
  ];

  return (
    <Layout>
      <HeroCarousel items={carouselItems} />
      <CategoryGrid categories={categories} />
      <ProductSection 
        title="Featured Products" 
        products={featuredProducts} 
        viewAllLink="/products" 
      />
      <CustomizeBanner />
      <ProductSection 
        title="Customizable Products" 
        products={customizableProducts} 
        viewAllLink="/customize" 
      />
      <FeatureGrid title="Why Choose KickVerse" features={features} />
      <NewsletterSignup />
    </Layout>
  );
};

export default HomePage;
