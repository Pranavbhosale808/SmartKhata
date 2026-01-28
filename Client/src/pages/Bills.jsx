import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getBills } from "../api/billApi";
import AddBillModal from "../components/AddBillModal";
import EditBillModal from "../components/EditBillModal";
import SettleCreditModal from "../components/SettleCreditModal";
import { downloadBillPdf } from "../utils/billPdf";
import { useVendor } from "../context/VendorContext";
import { useNavigate } from "react-router-dom";


export default function Bills() {
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettleOpen, setIsSettleOpen] = useState(false);

  const [selectedBill, setSelectedBill] = useState(null);
  const [creditBill, setCreditBill] = useState(null);

  const { vendor } = useVendor();
  const navigate = useNavigate();

  const loadBills = async (pageNo = 0) => {
    let res;

    if (status) {
      res = await fetchByStatus(pageNo);
    } else if (start && end) {
      res = await fetchByDate(pageNo);
    } else {
      res = await getBills({
        page: pageNo,
        size: 10,
        sortBy: "billDate",
        sortDir: "desc",
      });
    }

    setBills(res.data.data.content);
    setTotalPages(res.data.data.totalPages);
    setPage(pageNo);
  };

  const fetchByStatus = (pageNo) =>
    import("../api/filters").then(m =>
      m.getBillsByStatus(status, pageNo)
    );

  const fetchByDate = (pageNo) =>
    import("../api/filters").then(m =>
      m.getBillsByDateRange(start, end, pageNo)
    );

  useEffect(() => {
    loadBills(0);
  }, [status, start, end]);

  return (
    <DashboardLayout>
      <div className="bg-white min-h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold">Bills</h1>

            <button
             onClick={() => navigate("/bills/create")}
              className="px-5 py-2 bg-black text-white rounded-md"
            >
              + Create Bill
            </button>
          </div>

          {/* FILTER BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">

            <input
              type="text"
              placeholder="Search Bill No / Customer / Mobile"
              className="border p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="PAID">PAID</option>
              <option value="CREDIT">CREDIT</option>
            </select>

            <input
              type="date"
              className="border p-2 rounded"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 rounded"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Bill No</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">PDF</th>
                  <th className="p-3 text-center">Credit</th>
                  <th className="p-3 text-center">Edit</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((b, i) => (
                  <tr key={b.billId} className={i % 2 ? "bg-gray-50" : ""}>
                    <td className="p-3 font-medium">{b.billNumber}</td>
                    <td className="p-3">{b.billDate}</td>
                    <td className="p-3">
                      {b.customerName} <br />
                      <span className="text-xs text-gray-500">
                        {b.customerMobile}
                      </span>
                    </td>
                    <td className="p-3">₹ {b.totalAmount}</td>

                    <td className={`p-3 font-semibold ${b.status === "PAID" ? "text-green-600" : "text-red-600"}`}>
                      {b.status}
                    </td>

                    <td className="p-3 text-center">
                      <button onClick={() => downloadBillPdf(b, vendor)}>📄</button>
                    </td>

                    <td className="p-3 text-center">
                      {b.status === "CREDIT" && (
                        <button onClick={() => { setCreditBill(b); setIsSettleOpen(true); }}>
                          💰
                        </button>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <button onClick={() => { setSelectedBill(b); setIsEditOpen(true); }}>
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalPages).keys()].map((p) => (
              <button
                key={p}
                onClick={() => loadBills(p)}
                className={`px-3 py-1 border rounded ${p === page ? "bg-black text-white" : ""}`}
              >
                {p + 1}
              </button>
            ))}
          </div>

          {/* MODALS */}
          <AddBillModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={() => loadBills(page)} />
          <EditBillModal isOpen={isEditOpen} bill={selectedBill} onClose={() => setIsEditOpen(false)} onSuccess={() => loadBills(page)} />
          <SettleCreditModal isOpen={isSettleOpen} bill={creditBill} onClose={() => setIsSettleOpen(false)} onSuccess={() => loadBills(page)} />

        </div>
      </div>
    </DashboardLayout>
  );
}
