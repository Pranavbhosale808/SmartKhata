import { useEffect, useState } from "react";
import api from "../utils/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModel";

export default function Products() {
  const API = "/products";

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async (pageNo = 0, sortType = sort) => {
    try {
      let params = { page: pageNo, size: 10 };

      // 🔍 Search
      if (search.trim()) {
        const res = await api.get(`${API}/search`, {
          params: { keyword: search, page: pageNo, size: 10 },
        });
        setProducts(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        setPage(pageNo);
        return;
      }

      // 🔃 Sorting
      if (sortType === "lowPrice") {
        params.sortBy = "price";
        params.sortDir = "asc";
      } else if (sortType === "highPrice") {
        params.sortBy = "price";
        params.sortDir = "desc";
      }

      // ⚠️ Low stock
      if (sortType === "lowStock") {
        const res = await api.get(`${API}/low-stock`, {
          params: { threshold: 5, page: pageNo, size: 10 },
        });
        setProducts(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        setPage(pageNo);
        return;
      }

      if (sortType === "highStock") {
        params.sortBy = "quantity";
        params.sortDir = "desc";
      }

      const res = await api.get(API, { params });
      setProducts(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setPage(pageNo);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`${API}/${id}`);
    loadProducts(page);
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white text-slate-800 min-h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

            {/* SEARCH + FILTER */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search product by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  loadProducts(0);
                }}
                className="px-3 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  loadProducts(0, e.target.value);
                }}
                className="px-3 py-2 border rounded-md w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <option value="default">All Products</option>
                <option value="lowPrice">Price: Low → High</option>
                <option value="highPrice">Price: High → Low</option>
                <option value="lowStock">Low Stock</option>
                <option value="highStock">High Stock</option>
              </select>
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => setIsAddOpen(true)}
              className="w-full sm:w-auto px-5 py-2 bg-black text-white rounded-md hover:bg-black/90 transition"
            >
              + Add Product
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Price (₹)</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-center">Edit</th>
                  <th className="py-3 px-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4 font-medium whitespace-nowrap">{p.name}</td>
                    <td className="py-3 px-4">₹ {p.price}</td>
                    <td className="py-3 px-4">{p.quantity}</td>

                    <td className="py-3 px-4 text-center">
                      <button onClick={() => openEdit(p)} className="hover:scale-110 transition">
                        ✏️
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button onClick={() => deleteProduct(p.id)} className="hover:scale-110 transition">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[...Array(totalPages).keys()].map(p => (
              <button
                key={p}
                onClick={() => loadProducts(p)}
                className={`px-3 py-1 border rounded ${
                  p === page ? "bg-black text-white" : "bg-white"
                }`}
              >
                {p + 1}
              </button>
            ))}
          </div>

          <AddProductModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onProductAdded={() => loadProducts(page)}
          />

          <EditProductModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            product={selectedProduct}
            onUpdated={() => loadProducts(page)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
