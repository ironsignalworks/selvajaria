export type Category = 'release' | 'distro' | 'merch';

export interface Product {
  id: string;
  title: string;
  artist: string;
  price: number;
  category: Category;
  format?: string;
  releaseDate: string;
  description: string;
  imageUrl: string;
  catalogNumber?: string;
  stock: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
