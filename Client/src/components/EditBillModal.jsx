import { useEffect, useState } from "react";
import { updateBill } from "../api/billApi";

export default function EditBillModal({ isOpen, bill, onClose, onSuccess }) {

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [billDate, setBillDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (bill) {
      setCustomerName(bill.customerName);
      setCustomerMobile(bill.customerMobile);
      setBillDate(bill.billDate);
      setStatus(bill.status);
    }
  }, [bill]);

  if (!isOpen || !bill) return null;

  const submit = async () => {
    try {
      await updateBill(bill.billId, {
        billDate,
        customerName,
        customerMobile,
        status,
        items: bill.items.map(i => ({
          productId: i.productId,
          unitPriceSnapshot: i.unitPriceSnapshot,
          quantity: i.quantity
        }))
      });

      onSuccess();
      onClose();
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">

        <h2 className="text-lg font-bold">Edit Bill</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Customer name"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Mobile number"
          value={customerMobile}
          onChange={e => setCustomerMobile(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={billDate}
          onChange={e => setBillDate(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="PAID">PAID</option>
          <option value="CREDIT">CREDIT</option>
        </select>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-black text-white px-4 py-1 rounded"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}
