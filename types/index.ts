export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  ratings: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
