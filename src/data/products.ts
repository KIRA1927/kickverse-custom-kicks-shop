
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: "1",
    name: "Nike Air Force 1 '07",
    price: 129.99,
    description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c20afd60-b230-4815-bfd0-b5417b4393e1/air-force-1-07-shoes-WrLlWX.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e49d7890-8eee-47a7-abb8-0079bb2e8765/air-force-1-07-shoes-WrLlWX.png"
    ],
    category: "Lifestyle",
    brand: "Nike",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black", "Red"],
    rating: 4.8,
    inStock: 25,
    featured: true,
    isCustomizable: true
  },
  {
    id: "2",
    name: "Nike Air Max 90",
    price: 149.99,
    description: "Lace up and feel the legacy with the Nike Air Max 90. Featuring the same iconic Waffle sole, stitched overlays and classic TPU accents as the original, it lets you celebrate your love for streetwear culture and heritage Air.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e254d657-63c8-4f77-9cee-fbcf054d6c56/air-max-90-shoes-kRsBnD.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e254d657-63c8-4f77-9cee-fbcf054d6c56/air-max-90-shoes-kRsBnD.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb3a8def-bf93-42d8-8e6f-4d26f6a29c0c/air-max-90-shoes-kRsBnD.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d0c89b21-90d7-4a62-b555-2ee2195f90f1/air-max-90-shoes-kRsBnD.png"
    ],
    category: "Lifestyle",
    brand: "Nike",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black", "Blue"],
    rating: 4.7,
    inStock: 18,
    featured: false,
    isCustomizable: true
  },
  {
    id: "3",
    name: "Nike Dunk Low",
    price: 119.99,
    description: "Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with a padded, low-cut collar that looks sleek and feels great.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a42a5d8f-7c5a-4ad1-8f11-680d80d5a800/dunk-low-shoes-zs5fR7.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a42a5d8f-7c5a-4ad1-8f11-680d80d5a800/dunk-low-shoes-zs5fR7.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5f88e8cd-11c3-4963-8849-3a0f4c676b15/dunk-low-shoes-zs5fR7.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/00f75081-8ec7-43cb-8281-d0a0f0e80a40/dunk-low-shoes-zs5fR7.png"
    ],
    category: "Lifestyle",
    brand: "Nike",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black", "Green"],
    rating: 4.6,
    inStock: 15,
    featured: true,
    isCustomizable: true
  },
  {
    id: "4",
    name: "Nike Air Jordan 1 Mid",
    price: 159.99,
    description: "The Air Jordan 1 Mid brings full-court style and premium comfort to an iconic look. Its Air-Sole unit cushions play on the hardwood, while the padded collar gives you a supportive feel.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/01be2b9e-7054-4c7c-a5cf-a1da5cdddbdb/air-jordan-1-mid-shoes-SQf7DM.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/01be2b9e-7054-4c7c-a5cf-a1da5cdddbdb/air-jordan-1-mid-shoes-SQf7DM.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5299c9be-f08a-4a88-9d17-37561d6e793a/air-jordan-1-mid-shoes-SQf7DM.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c9e966fa-8349-4b3d-a6e8-2a0fafd0f10d/air-jordan-1-mid-shoes-SQf7DM.png"
    ],
    category: "Basketball",
    brand: "Nike",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black", "Red"],
    rating: 4.9,
    inStock: 12,
    featured: true,
    isCustomizable: true
  },
  {
    id: "5",
    name: "Nike SB Dunk High Pro",
    price: 139.99,
    description: "The Nike SB Dunk High Pro takes inspiration from the original 1985 Dunk, but it's modified for skateboarding with a Zoom Air unit in the heel and additional cushioning. The black and white colorway is skate-ready and versatile.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c9bfd148-4927-454d-bc15-d8a205dcd983/sb-dunk-high-pro-skate-shoes-MNhRx1.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c9bfd148-4927-454d-bc15-d8a205dcd983/sb-dunk-high-pro-skate-shoes-MNhRx1.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ff3e9c22-5d0a-4038-b19d-550c12a1a5b2/sb-dunk-high-pro-skate-shoes-MNhRx1.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8e4c425a-2eb1-4609-91c8-df2e86500913/sb-dunk-high-pro-skate-shoes-MNhRx1.png"
    ],
    category: "Skateboarding",
    brand: "Nike",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black"],
    rating: 4.5,
    inStock: 10,
    featured: false,
    isCustomizable: true
  }
];

// Utility functions for products
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getCustomizableProducts = (): Product[] => {
  return products.filter(product => product.isCustomizable);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(product => product.brand === brand);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};

export const getBrands = (): string[] => {
  return [...new Set(products.map(product => product.brand))];
};
