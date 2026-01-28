import { useEffect, useState } from "react";
import BillingLayout from "../layouts/BillingLayout";
import ProductPicker from "../components/billing/ProductPicker";
import BillItemsTable from "../components/billing/BillItemsTable";
import { createBill } from "../api/billApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BillPreviewModal from "../components/billing/BillPreviewModal";

export default function CreateBill() {
  const navigate = useNavigate();

  const [billNumber, setBillNumber] = useState("");
  const [billDate, setBillDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

  const [status, setStatus] = useState("PAID");       // PAID | CREDIT
  const [paymentMode, setPaymentMode] = useState("CASH"); // CASH | ONLINE

  const [items, setItems] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setBillNumber("SK-" + Date.now());
  }, []);

  /* ---------------- ADD PRODUCT ---------------- */

  const addProduct = (product) => {
    const exists = items.find((i) => i.productId === product.id);

    if (exists) {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === product.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                lineTotal: (i.quantity + 1) * i.unitPriceSnapshot,
              }
            : i
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          productId: product.id,
          description: product.name,
          unitPriceSnapshot: product.price,
          quantity: 1,
          lineTotal: product.price,
        },
      ]);
    }
  };

  /* ---------------- UPDATE QTY ---------------- */

  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setItems((prev) =>
      prev.map((i) =>
        i.productId === id
          ? { ...i, quantity: qty, lineTotal: qty * i.unitPriceSnapshot }
          : i
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.productId !== id));
  };

  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    if (!customerName.trim()) {
      toast.error("Customer name is required");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(customerMobile)) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }

    if (items.length === 0) {
      toast.error("Please add at least one product");
      return false;
    }

    return true;
  };

  /* ---------------- PAYLOAD ---------------- */

  const buildPayload = () => ({
    billNumber,
    billDate,
    customerName,
    customerMobile,
    status,
    items: items.map((i) => ({
      productId: i.productId,
      unitPriceSnapshot: i.unitPriceSnapshot,
      quantity: i.quantity,
    })),
  });

  /* ---------------- CREATE ONLY ---------------- */

  const createOnly = async () => {
    try {
      setProcessing(true);
      await createBill(buildPayload());
      toast.success("Bill created successfully");
      navigate("/bills");
    } finally {
      setProcessing(false);
    }
  };

  /* ---------------- RAZORPAY ---------------- */

  const openRazorpay = (billId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Math.round(total * 100),
      currency: "INR",
      name: "SmartKhata",
      description: `Bill #${billNumber}`,
      handler: function () {
        toast.success("Payment Successful");
        navigate("/bills");
      },
      prefill: {
        name: customerName,
        contact: customerMobile,
      },
      theme: { color: "#000000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ---------------- MAIN BUTTON ---------------- */

  const mainAction = () => {
    if (!validate()) return;

    if (status === "CREDIT") {
      createOnly();
    } else {
      setShowPreview(true);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <BillingLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800">🧾 Create Bill</h1>
          <div className="text-sm text-gray-500">Bill No: {billNumber}</div>
        </div>

        {/* CUSTOMER INFO */}
        <div className="bg-white shadow rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            placeholder="Customer Name"
            className="border p-2 rounded focus:ring-2 focus:ring-black/60"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            placeholder="Mobile Number"
            maxLength={10}
            className="border p-2 rounded focus:ring-2 focus:ring-black/60"
            value={customerMobile}
            onChange={(e) =>
              setCustomerMobile(e.target.value.replace(/\D/g, ""))
            }
          />

          <input
            type="date"
            className="border p-2 rounded focus:ring-2 focus:ring-black/60"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
          />

          <select
            className="border p-2 rounded focus:ring-2 focus:ring-black/60"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PAID">PAID</option>
            <option value="CREDIT">CREDIT</option>
          </select>
        </div>

        {/* PAYMENT MODE */}
        {status === "PAID" && (
          <div className="bg-white shadow rounded-xl p-4 flex gap-4">
            <button
              onClick={() => setPaymentMode("CASH")}
              className={`px-5 py-2 rounded-lg border font-semibold
                ${paymentMode === "CASH"
                  ? "bg-black text-white"
                  : "bg-white"}`}
            >
              💵 Cash
            </button>

            <button
              onClick={() => setPaymentMode("ONLINE")}
              className={`px-5 py-2 rounded-lg border font-semibold
                ${paymentMode === "ONLINE"
                  ? "bg-black text-white"
                  : "bg-white"}`}
            >
              💳 Online
            </button>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="bg-white shadow rounded-xl p-4">
          <ProductPicker onSelect={addProduct} />
        </div>

        {/* ITEMS */}
        <div className="bg-white shadow rounded-xl p-4">
          <BillItemsTable
            items={items}
            onQtyChange={updateQty}
            onRemove={removeItem}
          />
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white shadow-xl rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold">
            Grand Total:{" "}
            <span className="text-green-600">₹ {total.toFixed(2)}</span>
          </div>

          <button
            disabled={items.length === 0 || processing}
            onClick={mainAction}
            className={`px-8 py-2 rounded-lg font-semibold transition
              ${
                items.length === 0 || processing
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : status === "PAID"
                  ? "bg-green-600 text-white hover:opacity-90"
                  : "bg-black text-white hover:opacity-90"
              }`}
          >
            {processing
              ? "Processing..."
              : status === "CREDIT"
              ? "Save Bill"
              : paymentMode === "CASH"
              ? "Confirm Cash Payment"
              : "Pay Online"}
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      <BillPreviewModal
        isOpen={showPreview}
        bill={{ billNumber, billDate, customerName, customerMobile }}
        items={items}
        total={total.toFixed(2)}
        onClose={() => setShowPreview(false)}
        onProceed={async () => {
          try {
            setProcessing(true);
            setShowPreview(false);

            const res = await createBill(buildPayload());

            if (paymentMode === "ONLINE") {
              openRazorpay(res.data.data.billId);
            } else {
              toast.success("Cash payment recorded");
              navigate("/bills");
            }
          } finally {
            setProcessing(false);
          }
        }}
      />
    </BillingLayout>
  );
}
