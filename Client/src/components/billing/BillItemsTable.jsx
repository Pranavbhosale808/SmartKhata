export default function BillItemsTable({ items, onQtyChange, onRemove }) {
  if (items.length === 0)
    return <p className="text-gray-500">No products added.</p>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Total</th>
            <th className="p-2">Remove</th>
          </tr>
        </thead>

        <tbody>
          {items.map((i) => (
            <tr key={i.productId}>
              <td className="p-2">{i.description}</td>
              <td className="p-2">₹ {i.unitPriceSnapshot}</td>
              <td className="p-2">
                <input
                  type="number"
                  min="1"
                  value={i.quantity}
                  onChange={(e) =>
                    onQtyChange(i.productId, Number(e.target.value))
                  }
                  className="border w-16 p-1 rounded"
                />
              </td>
              <td className="p-2">₹ {i.lineTotal}</td>
              <td className="p-2">
                <button
                  onClick={() => onRemove(i.productId)}
                  className="text-red-600"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
