import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportDashboardPDF = ({
  stats,
  revenue,
  products,
  payments,
}) => {
  const doc = new jsPDF();



  doc.setFontSize(18);
  doc.text("SmartKhata - Business Overview Report", 14, 18);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 26);

  

  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Overview Stats", 14, 38);

  autoTable(doc, {
    startY: 42,
    head: [["Metric", "Value"]],
    body: [
      ["Total Bills", stats.totalBills],
      ["Paid Bills", stats.paidBills],
      ["Total Revenue", `₹ ${stats.totalRevenue}`],
      ["Pending Credit", `₹ ${stats.pendingCredit}`],
    ],
    theme: "grid",
  });

 

  let finalY = doc.lastAutoTable.finalY + 10;
  doc.text("Revenue Trend", 14, finalY);

  autoTable(doc, {
    startY: finalY + 4,
    head: [["Period", "Amount (₹)"]],
    body: revenue.map((r) => [r.label, r.amount]),
    theme: "striped",
  });



  finalY = doc.lastAutoTable.finalY + 10;
  doc.text("Top Products", 14, finalY);

  autoTable(doc, {
    startY: finalY + 4,
    head: [["Product", "Quantity Sold"]],
    body: products.map((p) => [p.productName || p.productId, p.quantity]),
    theme: "striped",
  });

 

  finalY = doc.lastAutoTable.finalY + 10;
  doc.text("Payment Methods", 14, finalY);

  autoTable(doc, {
    startY: finalY + 4,
    head: [["Method", "Transactions"]],
    body: payments.map((p) => [p.name, p.value]),
    theme: "striped",
  });

 

  finalY = doc.lastAutoTable.finalY + 12;
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    "Powered by SmartKhata • Smart Billing & Business Analytics",
    14,
    finalY
  );

  /* ================= SAVE ================= */

  doc.save(`SmartKhata-Dashboard-${new Date().toISOString().slice(0,10)}.pdf`);
};