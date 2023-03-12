const BASE_URL = "https://api.escuelajs.co/api/v1";

const createUrl = (url: string) => `${BASE_URL}/${url}`;

export const urls = {
  products: () => createUrl(`products`),
  product: (id: string) => createUrl(`products/${id}`),
};
