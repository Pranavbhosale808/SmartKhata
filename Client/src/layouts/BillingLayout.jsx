export default function BillingLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* TOP BAR */}
      <div className="bg-black text-white px-4 py-3 flex items-center justify-between shadow">
        <div className="font-bold text-lg tracking-wide">
          SmartKhata • Billing
        </div>

        <div className="text-sm opacity-80">
          Create Invoice
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}
