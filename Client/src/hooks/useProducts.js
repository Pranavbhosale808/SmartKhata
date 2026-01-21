import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 5;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts(pageNumber, pageSize);
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  return {
    products,
    loading,
    error,
    pageNumber,
    totalPages,
    setPageNumber,
    refresh: fetchProducts,
  };
};
