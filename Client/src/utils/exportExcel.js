import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportDashboardExcel = ({
  stats,
  revenue,
  products,
  payments,
}) => {
  const wb = XLSX.utils.book_new();

  /* ---------------- STATS ---------------- */
  const statsSheet = XLSX.utils.json_to_sheet([
    { Metric: "Total Bills", Value: stats.totalBills },
    { Metric: "Paid Bills", Value: stats.paidBills },
    { Metric: "Total Revenue", Value: stats.totalRevenue },
    { Metric: "Pending Credit", Value: stats.pendingCredit },
  ]);

  XLSX.utils.book_append_sheet(wb, statsSheet, "Overview");

  /* ---------------- REVENUE ---------------- */
  const revenueSheet = XLSX.utils.json_to_sheet(
    revenue.map((r) => ({
      Period: r.label,
      Revenue: r.amount,
    }))
  );

  XLSX.utils.book_append_sheet(wb, revenueSheet, "Revenue");

  /* ---------------- TOP PRODUCTS ---------------- */
  const productSheet = XLSX.utils.json_to_sheet(
    products.map((p) => ({
      ProductId: p.productId,
      QuantitySold: p.quantity,
    }))
  );

  XLSX.utils.book_append_sheet(wb, productSheet, "Top Products");

  /* ---------------- PAYMENT METHODS ---------------- */
  const paymentSheet = XLSX.utils.json_to_sheet(
    payments.map((p) => ({
      Method: p.name,
      Transactions: p.value,
    }))
  );

  XLSX.utils.book_append_sheet(wb, paymentSheet, "Payments");

  /* ---------------- DOWNLOAD ---------------- */
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, `SmartKhata-Dashboard-${new Date().toISOString()}.xlsx`);
};
