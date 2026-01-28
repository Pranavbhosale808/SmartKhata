import DashboardLayout from "../layouts/DashboardLayout";
import OverviewStats from "../components/OverviewStats";
import useDashboard from "../hooks/useDashboard";
import { motion } from "framer-motion";
import { exportDashboardExcel } from "../utils/exportExcel";
import { FileSpreadsheet } from "lucide-react";
<<<<<<< HEAD
import { exportDashboardPDF } from "../utils/exportDashboardPdf";
=======
import { exportDashboardPDF } from "../utils/exportDashboardPDF ";
>>>>>>> 8537c00f95939b3c67a93305d9ca87b1060fa819

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar, Download, Bell, TrendingUp } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

/* Colors for payment methods */
const COLORS = {
  CASH: "#facc15",
  RAZORPAY: "#22c55e",
};

export default function Overview() {
  const [range, setRange] = useState("LAST_30_DAYS");

  const today = new Date().toISOString().split("T")[0];

  const rangeMap = {
    TODAY: { from: today, to: today },
    LAST_7_DAYS: { from: "2026-01-01", to: "2026-01-07" },
    LAST_30_DAYS: { from: "2026-01-01", to: "2026-01-30" },
    LAST_6_MONTHS: { from: "2025-08-01", to: today },
  };

  const { from, to } = rangeMap[range];

  const { loading, stats, revenue, products, payments, alerts } = useDashboard(
    from,
    to,
  );

  /* Export PDF */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("SmartKhata Overview Report", 14, 15);

    doc.autoTable({
      startY: 25,
      head: [["Period", "Revenue"]],
      body: revenue.map((r) => [r.label, r.amount]),
    });

    doc.save("SmartKhata-Overview.pdf");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-black">
              Dashboard Overview
            </h1>
            <p className="text-black/60 text-sm">Business analytics overview</p>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Calendar size={16} />
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="outline-none text-sm"
              >
                <option value="TODAY">Today</option>
                <option value="LAST_7_DAYS">Last 7 Days</option>
                <option value="LAST_30_DAYS">Last 30 Days</option>
                <option value="LAST_6_MONTHS">Last 6 Months</option>
              </select>
            </div>

            <button
              onClick={() =>
                exportDashboardExcel({
                  stats,
                  revenue,
                  products,
                  payments,
                })
              }
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              <FileSpreadsheet size={16} />
              Export Excel
            </button>

            <button
              onClick={() =>
                exportDashboardPDF({
                  stats,
                  revenue,
                  products,
                  payments,
                })
              }
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <OverviewStats loading={loading} data={stats} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow p-4"
          >
            <h3 className="text-sm font-semibold mb-2">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={revenue}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line dataKey="amount" stroke="#22c55e" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Products */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow p-4"
          >
            <h3 className="text-sm font-semibold mb-2">Top Products</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={products}>
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow p-4"
          >
            <h3 className="text-sm font-semibold mb-2">Payment Methods</h3>
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie
                  data={payments}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={65}
                >
                  {payments.map((p) => (
                    <Cell key={p.name} fill={COLORS[p.name] || "#000"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Alerts */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Bell size={16} className="text-green-500" />
              <h3 className="text-sm font-semibold">Alerts</h3>
            </div>
            <ul className="space-y-2 text-sm text-black/70">
              {alerts.map((a, i) => (
                <li key={i} className="border-l-4 border-green-500 pl-3">
                  {a.message}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Insight */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow p-4"
          >
            <div className="flex items-center gap-2 mb-2 text-green-500">
              <TrendingUp size={16} />
              <h3 className="text-sm font-semibold text-black">
                Business Insight
              </h3>
            </div>
            <p className="text-sm text-black/70">
              Revenue is now based on verified payments. Track cash vs online to
              improve business strategy.
            </p>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}