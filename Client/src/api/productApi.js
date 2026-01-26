import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const headers = {
  "X-Vendor-Id": 1, 
};

export const getProducts = (pageNumber, pageSize) =>
  api.get("/products", {
    params: { pageNumber, pageSize },
    headers,
  });

export const createProduct = (data) =>
  api.post("/products", data, { headers });

export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data, { headers });

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`, { headers });
