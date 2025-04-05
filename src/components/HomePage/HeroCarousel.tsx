
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselItem {
  image: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  return (
    <section className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="relative w-full">
              <div className="relative h-[400px] md:h-[600px] w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6 md:px-16">
                  <div className="max-w-lg text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h1>
                    <p className="text-lg mb-6">{item.description}</p>
                    <Link to={item.link}>
                      <Button size="lg" className="bg-purple-700 hover:bg-purple-800">
                        {item.buttonText} <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
