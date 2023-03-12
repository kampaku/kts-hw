export type CategoryApi = {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

export type CategoryModel = {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

export const normalizeCategory = (from: CategoryApi) => {
  return {
    id: from.id,
    name: from.name,
    image: from.image,
    creationAt: from.creationAt,
    updatedAt: from.updatedAt,
  };
};
