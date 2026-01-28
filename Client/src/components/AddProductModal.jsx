import { useState } from "react";
import { createProduct } from "../api/productApi";

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      onProductAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
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
              className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-black"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
