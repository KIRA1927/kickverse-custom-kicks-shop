
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About KickVerse</h1>
          
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="KickVerse store interior" 
              className="w-full h-80 object-cover rounded-lg shadow-lg mb-6"
            />
            
            <p className="text-lg mb-4">
              Welcome to KickVerse, where passion for sneakers meets innovative customization. 
              Founded in 2022, we set out to revolutionize how sneaker enthusiasts express their 
              individuality through footwear.
            </p>
            
            <p className="text-lg">
              Our mission is simple: provide premium quality sneakers with unparalleled customization 
              options, allowing you to wear truly unique shoes that reflect your personal style.
            </p>
          </div>
          
          <Separator className="my-12" />
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="md:w-1/2">
                <p className="mb-4">
                  KickVerse began when our founder, a sneaker collector and artist, became frustrated 
                  with the limited personalization options available from major brands. Why should 
                  everyone wear the same designs when footwear can be as unique as the individuals wearing them?
                </p>
                
                <p>
                  Starting with just a small workshop and a handful of dedicated craftspeople, 
                  we've grown into a community of designers, technologists, and sneaker enthusiasts 
                  united by our love for exceptional footwear and creative expression.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Sneaker customization process" 
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p>
                  We never compromise on materials or craftsmanship. Every pair of sneakers meets our 
                  rigorous standards for durability, comfort, and aesthetic excellence.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Creative Freedom</h3>
                <p>
                  We believe in empowering our customers to express themselves. Our customization 
                  options are designed to unleash your creativity without limitations.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p>
                  We're committed to reducing our environmental footprint through responsible sourcing, 
                  waste reduction, and developing eco-friendly customization technologies.
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                  name: "Sarah Chen",
                  role: "Head of Design",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                  name: "Marcus Rivera",
                  role: "Production Manager",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                },
                {
                  name: "Jamal Williams",
                  role: "Technical Director",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
