const BASE_URL = "https://api.escuelajs.co/api/v1";

const createUrl = (url: string) => `${BASE_URL}/${url}`;

type productParamsType = {
  offset: number;
  limit: number;
  title: string;
};

export const urls = {
  products: ({ offset, limit, title }: productParamsType) =>
    createUrl(`products?offset=${offset}&limit=${limit}&title=${title}`),
  product: (id: string) => createUrl(`products/${id}`),
};
