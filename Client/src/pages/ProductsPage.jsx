import { useState } from "react";
import ProductTopBar from "../components/product/ProductTopBar";
import ProductTable from "../components/product/ProductTable";
import ProductFormModal from "../components/product/ProductFormModal";
import DeleteConfirmModal from "../components/product/DeleteConfirmModal";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const {
    products,
    pageNumber,
    totalPages,
    setPageNumber,
    refresh,
  } = useProducts();

  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        <ProductTopBar onAdd={() => setAddOpen(true)} />

        <ProductTable
          products={products}
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
          onEdit={setEditProduct}
          onDelete={setDeleteProduct}
        />

        {addOpen && (
          <ProductFormModal
            mode="add"
            onClose={() => setAddOpen(false)}
            onSuccess={refresh}
          />
        )}

        {editProduct && (
          <ProductFormModal
            mode="edit"
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onSuccess={refresh}
          />
        )}

        {deleteProduct && (
          <DeleteConfirmModal
            product={deleteProduct}
            onClose={() => setDeleteProduct(null)}
            onSuccess={refresh}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
