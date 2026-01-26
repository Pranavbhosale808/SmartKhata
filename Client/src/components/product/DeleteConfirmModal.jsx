import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { deleteProduct as deleteProductApi } from "../../api/productApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../utils/errorUtils";

const DeleteConfirmModal = ({ product, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProductApi(product.id);
         toast.success("Product deleted successfully");
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to delete product");
       toast.error("Stock quantity should be zero before deleting product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-scaleIn p-6 text-center">
        
        <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center bg-red-100 rounded-full">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
        </div>

        <h3 className="text-lg font-semibold">Delete Product</h3>

        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete <b>{product.name}</b>?  
          This action cannot be undone.
        </p>

        {error && (
          <p className="text-sm text-red-500 mt-3">{error}</p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 border rounded-xl hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-red-400/50 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;



