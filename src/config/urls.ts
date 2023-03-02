const BASE_URL = "https://api.escuelajs.co/api/v1";

const createUrl = (url: string) => `${BASE_URL}/${url}`;

export const urls = {
  products: (offset: number, limit = 20) =>
    createUrl(`products?offset=${offset}&limit=${limit}`),
  product: (id: string) => createUrl(`products/${id}`),
};
