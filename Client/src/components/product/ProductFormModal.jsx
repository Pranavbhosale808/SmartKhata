import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProduct, updateProduct } from "../../api/productApi";
import { extractErrorMessage } from "../../utils/errorUtils";

const ProductFormModal = ({ mode, product, onClose, onSuccess }) => {
  const isEdit = mode === "edit";
  

  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "",
    stockQty: "",
  });

  const [loading, setLoading] = useState(false); // ✅ FIXED
  const [errors, setErrors] = useState({});     // optional, for field errors

  useEffect(() => {
    if (isEdit && product) {
      setForm({
        name: product.name,
        price: product.price,
        unit: product.unit,
        stockQty: product.stockQty,
      });
    }
  }, [isEdit, product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      price: Number(form.price),
      unit: form.unit,
      stockQty: Number(form.stockQty),
    };

    try {
      if (isEdit) {
        await updateProduct(product.id, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product added successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      if (error.response?.data && typeof error.response.data === "object") {
        setErrors(error.response.data);
      } else {
        toast.error(extractErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-scaleIn">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-orange-50 rounded-t-2xl border-b">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-orange-100">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          
          <div>
            <input
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-400"
              required
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-400"
                required
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <input
                name="unit"
                placeholder="Unit (kg, piece)"
                value={form.unit}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-400"
                required
              />
              {errors.unit && (
                <p className="text-xs text-red-500 mt-1">{errors.unit}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="number"
              name="stockQty"
              placeholder="Stock quantity"
              value={form.stockQty}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-400"
              required
            />
            {errors.stockQty && (
              <p className="text-xs text-red-500 mt-1">{errors.stockQty}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-orange-500 text-white shadow hover:bg-orange-600 hover:shadow-orange-300/50 disabled:opacity-50"
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
