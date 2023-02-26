type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: Category;
};
