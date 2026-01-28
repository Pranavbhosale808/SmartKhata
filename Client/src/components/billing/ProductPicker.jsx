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
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Add Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className="border rounded p-3 cursor-pointer hover:bg-gray-100"
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-500">₹ {p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
