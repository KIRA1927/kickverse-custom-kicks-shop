
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
  },
  {
    id: "6",
    name: "Nike Air Zoom Pegasus 39",
    price: 129.99,
    description: "The Nike Air Zoom Pegasus 39 brings back responsive cushioning for serious runners. Breathable mesh in the upper combines with Nike Zoom Air units for maximum comfort and durability.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/35c25005-34d9-4968-b8ba-8eb465cacaad/pegasus-39-road-running-shoes-kmZSD6.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/35c25005-34d9-4968-b8ba-8eb465cacaad/pegasus-39-road-running-shoes-kmZSD6.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a6c89ce6-bbcf-40a7-bc52-47189a33cbb1/pegasus-39-road-running-shoes-kmZSD6.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/446e5a30-d885-4ca3-9b40-4891900bfd50/pegasus-39-road-running-shoes-kmZSD6.png"
    ],
    category: "Running",
    brand: "Nike",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Blue", "Black", "White"],
    rating: 4.8,
    inStock: 20,
    featured: true,
    isCustomizable: true
  },
  {
    id: "7",
    name: "Adidas Ultraboost 22",
    price: 189.99,
    description: "Experience incredible energy return with the Adidas Ultraboost 22. The responsive Boost midsole and Primeknit+ upper provide breathable support for all your runs.",
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aec5d8e90fd447c585f1ad7800abd1d0_9366/Ultraboost_22_Shoes_Black_GZ0127_02_standard_hover.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e44db8c5399145f9a0f3ad7800abd9e2_9366/Ultraboost_22_Shoes_Black_GZ0127_03_standard.jpg"
    ],
    category: "Running",
    brand: "Adidas",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Black", "White", "Gray"],
    rating: 4.9,
    inStock: 15,
    featured: true,
    isCustomizable: false
  },
  {
    id: "8",
    name: "Adidas Stan Smith",
    price: 89.99,
    description: "The Adidas Stan Smith has become a style icon. The clean, minimal design and leather upper make these shoes perfect for everyday wear.",
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg",
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/37ab02f14b3f4248a286ac1e00f51dc1_9366/Stan_Smith_Shoes_White_FX5502_02_standard_hover.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f7b3df46f31e4f1c9409ac1e00f5266c_9366/Stan_Smith_Shoes_White_FX5502_03_standard.jpg"
    ],
    category: "Lifestyle",
    brand: "Adidas",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
    colors: ["White", "Green", "Blue"],
    rating: 4.7,
    inStock: 30,
    featured: false,
    isCustomizable: false
  },
  {
    id: "9",
    name: "Puma Suede Classic XXI",
    price: 69.99,
    description: "The Puma Suede Classic XXI is a streetwear legend. The iconic design features a soft suede upper and the famous Puma Formstrip.",
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1200,h_1200/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers",
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1200,h_1200/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers",
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1200,h_1200/global/374915/01/sv02/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers",
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1200,h_1200/global/374915/01/sv03/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    ],
    category: "Lifestyle",
    brand: "Puma",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    colors: ["Blue", "Black", "Red"],
    rating: 4.5,
    inStock: 25,
    featured: false,
    isCustomizable: false
  },
  {
    id: "10",
    name: "Converse Chuck Taylor All Star",
    price: 59.99,
    description: "The Converse Chuck Taylor All Star is the original basketball shoe that became a cultural icon. The classic canvas upper and rubber sole provide timeless style.",
    image: "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw9cc7d85c/images/d_08/M9160_D_08X1.jpg?sw=1200",
    images: [
      "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw9cc7d85c/images/d_08/M9160_D_08X1.jpg?sw=1200",
      "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw55a9615c/images/d_07/M9160_D_07X1.jpg?sw=1200",
      "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw80c28785/images/a_08/M9160_A_08X1.jpg?sw=1200"
    ],
    category: "Casual",
    brand: "Converse",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Black", "White", "Red"],
    rating: 4.8,
    inStock: 40,
    featured: false,
    isCustomizable: false
  },
  {
    id: "11",
    name: "Under Armour Curry 9",
    price: 159.99,
    description: "The Under Armour Curry 9 is built for speed and agility on the basketball court. The lightweight design and responsive cushioning help you make quick cuts and explosive moves.",
    image: "https://underarmour.scene7.com/is/image/Underarmour/3025346-004_DEFAULT?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
    images: [
      "https://underarmour.scene7.com/is/image/Underarmour/3025346-004_DEFAULT?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
      "https://underarmour.scene7.com/is/image/Underarmour/3025346-004_A?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
      "https://underarmour.scene7.com/is/image/Underarmour/3025346-004_B?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708"
    ],
    category: "Basketball",
    brand: "Under Armour",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Black", "Blue", "White"],
    rating: 4.6,
    inStock: 18,
    featured: true,
    isCustomizable: false
  },
  {
    id: "12",
    name: "New Balance 990v5",
    price: 184.99,
    description: "The New Balance 990v5 continues the legacy of the 990 series with premium materials and exceptional comfort. Made in the USA, these shoes feature ENCAP midsole cushioning and a supportive fit.",
    image: "https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$&wid=880&hei=880",
    images: [
      "https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$&wid=880&hei=880",
      "https://nb.scene7.com/is/image/NB/m990gl5_nb_05_i?$pdpflexf2$&wid=880&hei=880",
      "https://nb.scene7.com/is/image/NB/m990gl5_nb_03_i?$pdpflexf2$&wid=880&hei=880"
    ],
    category: "Running",
    brand: "New Balance",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Gray", "Navy", "Black"],
    rating: 4.9,
    inStock: 12,
    featured: false,
    isCustomizable: false
  },
  {
    id: "13",
    name: "Nike LeBron 19",
    price: 199.99,
    description: "The Nike LeBron 19 is designed for one of basketball's most dominant players. The responsive cushioning and supportive upper help you play with power and precision.",
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/55d52a03-d3e9-4f31-8c22-831771e8ff4b/lebron-xix-basketball-shoes-VkqHgW.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/55d52a03-d3e9-4f31-8c22-831771e8ff4b/lebron-xix-basketball-shoes-VkqHgW.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fc0b79c9-0090-4d96-8d35-934a157bdc09/lebron-xix-basketball-shoes-VkqHgW.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9a0a0a8a-1f9b-4c08-965e-32c891fa7a3e/lebron-xix-basketball-shoes-VkqHgW.png"
    ],
    category: "Basketball",
    brand: "Nike",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    colors: ["Purple", "Black", "White"],
    rating: 4.7,
    inStock: 10,
    featured: true,
    isCustomizable: true
  },
  {
    id: "14",
    name: "Adidas Superstar",
    price: 89.99,
    description: "The Adidas Superstar was introduced in 1969 as a basketball shoe, but quickly became a statement of hip-hop and street style. The iconic shell toe and 3-Stripes design remain unchanged.",
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg",
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9aa935080d1849a1829caad6009a0fd3_9366/Superstar_Shoes_White_EG4958_02_standard_hover.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/13f00514a6ed4916a93eaad6009a1a9e_9366/Superstar_Shoes_White_EG4958_03_standard.jpg"
    ],
    category: "Lifestyle",
    brand: "Adidas",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black", "Gold"],
    rating: 4.8,
    inStock: 35,
    featured: true,
    isCustomizable: false
  },
  {
    id: "15",
    name: "Vans Old Skool",
    price: 69.99,
    description: "The Vans Old Skool is a skate classic with the iconic side stripe. The combination of suede and canvas provides durability while the padded collar offers support and flexibility.",
    image: "https://images.vans.com/is/image/VansEU/VD3HY28-HERO?$583x583$",
    images: [
      "https://images.vans.com/is/image/VansEU/VD3HY28-HERO?$583x583$",
      "https://images.vans.com/is/image/VansEU/VD3HY28-ALT1?$583x583$",
      "https://images.vans.com/is/image/VansEU/VD3HY28-ALT2?$583x583$"
    ],
    category: "Skateboarding",
    brand: "Vans",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Black", "White", "Blue"],
    rating: 4.7,
    inStock: 28,
    featured: false,
    isCustomizable: false
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

// Add the getRelatedProducts function
export const getRelatedProducts = (category: string, currentProductId: string): Product[] => {
  return products
    .filter(product => 
      product.category === category && product.id !== currentProductId
    )
    .slice(0, 4); // Limit to 4 related products
};
