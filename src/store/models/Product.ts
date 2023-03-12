import { CategoryApi, normalizeCategory } from "./Category";

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: CategoryApi;
};

export type ProductModel = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: CategoryApi;
};

export const normalizeProduct = (from: ProductApi) => {
  return {
    id: from.id,
    title: from.title,
    price: from.price,
    description: from.description,
    images: from.images,
    creationAt: from.creationAt,
    updatedAt: from.updatedAt,
    category: normalizeCategory(from.category),
  };
};
