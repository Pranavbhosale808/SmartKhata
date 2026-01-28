import { useState } from "react";
import { createBill } from "../api/billApi";

export default function AddBillModal({ isOpen, onClose, onSuccess }) {
  const [billNumber, setBillNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("PAID");

  if (!isOpen) return null;

  const submit = async () => {
    await createBill({
      billNumber,
      billDate: new Date().toISOString().slice(0, 10),
      totalAmount,
      status,
      items: []
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-lg font-bold">Create Bill</h2>

        <input
          placeholder="Bill Number"
          className="w-full border p-2 rounded"
          value={billNumber}
          onChange={e => setBillNumber(e.target.value)}
        />

        <input
          placeholder="Total Amount"
          type="number"
          className="w-full border p-2 rounded"
          value={totalAmount}
          onChange={e => setTotalAmount(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>PAID</option>
          <option>CREDIT</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-black text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
