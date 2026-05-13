import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async (limit = 10): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/products?limit=${limit}`);
  return response.data;
};

export default api;
