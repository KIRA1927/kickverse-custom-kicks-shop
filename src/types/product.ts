
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  rating: number;
  inStock: number;
  featured?: boolean;
  isCustomizable?: boolean;
}
