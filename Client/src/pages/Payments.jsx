import DashboardLayout from "../layouts/DashboardLayout";
<<<<<<< HEAD
import usePayments from "../hooks/usePayments";
=======
import usePayments from "../hooks/usePayment";
>>>>>>> 8537c00f95939b3c67a93305d9ca87b1060fa819

export default function Payments() {
  const {
    payments,
    page,
    totalPages,
    loading,
    sortDir,
    loadPayments,
  } = usePayments();

  return (
    <DashboardLayout>
      <div className="bg-white min-h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-black">💳 Payments</h1>

            <select
              value={sortDir}
              onChange={(e) => loadPayments(0, e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Payment ID</th>
                  <th className="p-3 text-left">Bill No</th>
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Time</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      Loading payments...
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  payments.map((p, i) => (
                    <tr
                      key={p.paymentId}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-3 font-medium">{p.paymentId}</td>
                      <td className="p-3">{p.billNumber}</td>

                      {/* METHOD */}
                      <td
                        className={`p-3 font-semibold ${
                          p.method === "CASH"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {p.method}
                      </td>

                      <td className="p-3">₹ {p.amount}</td>

                      {/* STATUS */}
                      <td
                        className={`p-3 font-semibold ${
                          p.status === "SUCCESS"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {p.status}
                      </td>

                      {/* TIME */}
                      <td className="p-3 text-gray-600">
                        {new Date(p.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[...Array(totalPages).keys()].map((p) => (
              <button
                key={p}
                onClick={() => loadPayments(p, sortDir)}
                className={`px-3 py-1 border rounded ${
                  p === page
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {p + 1}
              </button>
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}