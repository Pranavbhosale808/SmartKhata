import api from "../utils/axios";

export const getProducts = ({
  page = 0,
  size = 10,
  sortBy = "name",
  sortDir = "asc",
} = {}) =>
  api.get("/products", {
    params: { page, size, sortBy, sortDir },
  });

export const searchProducts = ({
  keyword,
  page = 0,
  size = 10,
}) =>
  api.get("/products/search", {
    params: { keyword, page, size },
  });

export const filterProductsByPrice = ({
  minPrice,
  maxPrice,
  page = 0,
  size = 10,
}) =>
  api.get("/products/price-range", {
    params: { minPrice, maxPrice, page, size },
  });

export const getLowStockProducts = ({
  threshold = 5,
  page = 0,
  size = 10,
}) =>
  api.get("/products/low-stock", {
    params: { threshold, page, size },
  });

export const createProduct = (data) =>
  api.post("/products", data);

export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);
