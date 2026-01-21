import {
  PencilSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const ProductTable = ({
  products,
  pageNumber,
  totalPages,
  setPageNumber,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">Product</th>
            <th className="px-6 py-4 text-left">Price</th>
            <th className="px-6 py-4 text-left">Unit</th>
            <th className="px-6 py-4 text-left">Stock</th>
            <th className="px-6 py-4 text-center">Edit</th>
            <th className="px-6 py-4 text-center">Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-t hover:bg-orange-50/40 transition"
            >
              <td className="px-6 py-5 font-semibold text-gray-800">
                {p.name}
              </td>

              <td className="px-6 py-5">₹{p.price}</td>

              <td className="px-6 py-5">{p.unit}</td>

              <td className="px-6 py-5">{p.stockQty}</td>

              {/* Edit column */}
              <td className="px-6 py-5 text-center">
                <button
                  onClick={() => onEdit(p)}
                  className="inline-flex items-center justify-center p-2 rounded-lg
                             text-blue-600 hover:bg-blue-50 transition"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </td>

              {/* Delete column */}
              <td className="px-6 py-5 text-center">
                <button
                  onClick={() => onDelete(p)}
                  className="inline-flex items-center justify-center p-2 rounded-lg
                             text-red-600 hover:bg-red-50 transition"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
        <button
          onClick={() => setPageNumber((p) => Math.max(p - 1, 0))}
          disabled={pageNumber === 0}
          className="flex gap-2 px-4 py-2 border rounded-xl bg-white disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Prev
        </button>

        <span className="text-sm text-gray-700">
          Page <b>{pageNumber + 1}</b> of <b>{totalPages}</b>
        </span>

        <button
          onClick={() =>
            setPageNumber((p) => (p + 1 < totalPages ? p + 1 : p))
          }
          disabled={pageNumber + 1 >= totalPages}
          className="flex gap-2 px-4 py-2 border rounded-xl bg-white disabled:opacity-50"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
