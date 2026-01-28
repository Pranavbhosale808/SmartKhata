export default function BillPreviewModal({
  isOpen,
  bill,
  items,
  total,
  onClose,
  onProceed
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[95%] max-w-2xl p-5 space-y-4">

        <h2 className="text-xl font-bold text-center">🧾 Bill Preview</h2>

        {/* CUSTOMER */}
        <div className="border rounded p-3 grid grid-cols-2 gap-2 text-sm">
          <p><b>Name:</b> {bill.customerName}</p>
          <p><b>Mobile:</b> {bill.customerMobile}</p>
          <p><b>Date:</b> {bill.billDate}</p>
          <p><b>Bill No:</b> {bill.billNumber}</p>
        </div>

        {/* ITEMS */}
        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.productId} className="text-center border-t">
                  <td className="p-2">{i.description}</td>
                  <td className="p-2">{i.quantity}</td>
                  <td className="p-2">₹ {i.unitPriceSnapshot}</td>
                  <td className="p-2">₹ {i.lineTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div className="text-right text-lg font-bold">
          Grand Total: <span className="text-green-600">₹ {total}</span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="px-5 py-2 bg-black text-white rounded"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
