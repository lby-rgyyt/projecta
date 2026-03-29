export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inventory: number;
  image: string[];
}

export interface CartItem {
  productId: Product;
  quantity: number;
}