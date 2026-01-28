import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadBillPdf = (bill, vendor) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  /* =========================
      SHOP HEADER
  ========================== */

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(vendor?.shopName || "SmartKhata Store", pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Owner: ${vendor?.ownerName || "Shop Owner"}`,
    pageWidth / 2,
    28,
    { align: "center" }
  );

  doc.setFontSize(10);
  doc.text(
    vendor?.phone ? `Phone: ${vendor.phone}` : "",
    pageWidth / 2,
    34,
    { align: "center" }
  );

  doc.line(14, 38, pageWidth - 14, 38);

  /* =========================
      BILL INFO
  ========================== */

  doc.setFontSize(11);
  doc.text(`Bill No: ${bill.billNumber}`, 14, 46);
  doc.text(`Date: ${bill.billDate}`, pageWidth - 14, 46, { align: "right" });

  doc.text(`Customer: ${bill.customerName}`, 14, 52);
  doc.text(`Mobile: ${bill.customerMobile}`, pageWidth - 14, 52, { align: "right" });

  doc.text(`Status: ${bill.status}`, 14, 58);

  /* =========================
      ITEMS TABLE
  ========================== */

  autoTable(doc, {
    startY: 65,
    theme: "grid",
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: 255,
      halign: "center",
    },
    styles: {
      fontSize: 10,
      halign: "center",
    },
    head: [
      ["#", "Product", "Qty", "Unit Price (₹)", "Total (₹)"],
    ],
    body: bill.items.map((item, index) => [
      index + 1,
      item.description || `Product ${item.productId}`,
      item.quantity,
      item.unitPriceSnapshot,
      item.lineTotal,
    ]),
  });

  /* =========================
      TOTAL SECTION
  ========================== */

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(
    `Grand Total: ₹ ${bill.totalAmount}`,
    pageWidth - 14,
    finalY,
    { align: "right" }
  );

  /* =========================
      FOOTER
  ========================== */

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    "Thank you for shopping with us!",
    pageWidth / 2,
    finalY + 18,
    { align: "center" }
  );

  doc.setFontSize(9);
  doc.text(
    "Powered by SmartKhata",
    pageWidth / 2,
    finalY + 24,
    { align: "center" }
  );

  /* =========================
      SAVE FILE
  ========================== */

  doc.save(`Bill-${bill.billNumber}.pdf`);
};
