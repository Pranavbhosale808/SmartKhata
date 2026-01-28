import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";

export default function ProductPicker({ onSelect }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getProducts({ page: 0, size: 100 });
    setProducts(res.data.data.content);
  };

  return (
    <div className="border rounded-xl p-4 bg-white">
      <h2 className="font-semibold mb-3 text-slate-800">🛒 Add Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => {
          const outOfStock = p.quantity === 0;
          const lowStock = p.quantity > 0 && p.quantity <= 5;

          return (
            <div
              key={p.id}
              onClick={() => !outOfStock && onSelect(p)}
              className={`border rounded-xl p-3 transition
                ${
                  outOfStock
                    ? "bg-gray-100 opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                }`}
            >
              <div className="font-medium text-slate-800 truncate">
                {p.name}
              </div>

              <div className="text-sm text-gray-600 mt-1">
                ₹ {p.price}
              </div>

              <div
                className={`text-xs mt-1 font-semibold
                  ${
                    outOfStock
                      ? "text-red-600"
                      : lowStock
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
              >
                {outOfStock
                  ? "Out of stock"
                  : lowStock
                  ? `Low stock: ${p.quantity}`
                  : `Stock: ${p.quantity}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
