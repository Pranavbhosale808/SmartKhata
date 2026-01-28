import { useState } from "react";
import axios from "axios";

export default function SettleCreditModal({ bill, isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");

  if (!isOpen || !bill) return null;

  const submit = async () => {
    await axios.post("http://localhost:8080/api/payments", {
      billId: bill.billId,
      amountPaid: amount,
      method: "CASH"
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 space-y-4">
        <h2 className="text-lg font-bold">Settle Credit</h2>

        <p className="text-sm text-gray-600">
          Bill No: {bill.billNumber}
        </p>

        <input
          type="number"
          placeholder="Amount Paid"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
