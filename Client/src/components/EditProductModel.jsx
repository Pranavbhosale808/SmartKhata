import { useState, useEffect } from "react";
import { updateProduct } from "../api/productApi";

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      await updateProduct(product.id, {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
