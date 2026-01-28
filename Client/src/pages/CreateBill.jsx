import { useEffect, useState } from "react";
import BillingLayout from "../layouts/BillingLayout";
import ProductPicker from "../components/billing/ProductPicker";
import BillItemsTable from "../components/billing/BillItemsTable";
import { createBill } from "../api/billApi";
import { createRazorpayOrder, verifyRazorpayPayment, recordCashPayment } from "../api/paymentApi";
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

  const [status, setStatus] = useState("PAID");
  const [paymentMode, setPaymentMode] = useState("CASH");

  const [items, setItems] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setBillNumber("SK-" + Date.now());
  }, []);

  /* ---------------- PRODUCTS ---------------- */

  const addProduct = (product) => {
    const exists = items.find((i) => i.productId === product.id);

    if (exists) {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1, lineTotal: (i.quantity + 1) * i.unitPriceSnapshot }
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

  /* ---------------- RAZORPAY FLOW ---------------- */

  const openRazorpay = async (billId) => {
    // 1. create backend order
    const orderRes = await createRazorpayOrder({
      billId,
      amount: total,
    });

    const orderId = orderRes.data.data;

    // 2. open razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Math.round(total * 100),
      currency: "INR",
      name: "SmartKhata",
      description: `Bill #${billNumber}`,
      order_id: orderId,

      handler: async function (response) {
        try {
          // 3. verify payment in backend
          await verifyRazorpayPayment({
            billId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          toast.success("Payment successful");
          navigate("/bills");
        } catch {
          toast.error("Payment verification failed");
        }
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

  /* ---------------- MAIN ACTION ---------------- */

  const mainAction = () => {
    if (!validate()) return;

    if (status === "CREDIT") {
      setShowPreview(true);
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
          <input placeholder="Customer Name" className="border p-2 rounded"
            value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

          <input placeholder="Mobile Number" maxLength={10} className="border p-2 rounded"
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, ""))} />

          <input type="date" className="border p-2 rounded"
            value={billDate} onChange={(e) => setBillDate(e.target.value)} />

          <select className="border p-2 rounded"
            value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PAID">PAID</option>
            <option value="CREDIT">CREDIT</option>
          </select>
        </div>

        {/* PAYMENT MODE */}
        {status === "PAID" && (
          <div className="bg-white shadow rounded-xl p-4 flex gap-4">
            <button onClick={() => setPaymentMode("CASH")}
              className={`px-5 py-2 rounded-lg border font-semibold ${paymentMode === "CASH" ? "bg-black text-white" : ""}`}>
              💵 Cash
            </button>

            <button onClick={() => setPaymentMode("ONLINE")}
              className={`px-5 py-2 rounded-lg border font-semibold ${paymentMode === "ONLINE" ? "bg-black text-white" : ""}`}>
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
          <BillItemsTable items={items} onQtyChange={updateQty} onRemove={removeItem} />
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white shadow-xl rounded-xl p-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            Grand Total: <span className="text-green-600">₹ {total.toFixed(2)}</span>
          </div>

          <button disabled={items.length === 0 || processing}
            onClick={mainAction}
            className="px-8 py-2 rounded-lg font-semibold bg-green-600 text-white">
            {status === "CREDIT"
              ? "Save Bill"
              : paymentMode === "CASH"
              ? "Confirm Cash"
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
            const billId = res.data.data.billId;

            if (status === "CREDIT") {
              toast.success("Credit bill created");
              navigate("/bills");
            } else if (paymentMode === "CASH") {
              await recordCashPayment({ billId, amount: total });
              toast.success("Cash payment recorded");
              navigate("/bills");
            } else {
              await openRazorpay(billId);
            }

          } finally {
            setProcessing(false);
          }
        }}
      />
    </BillingLayout>
  );
}
