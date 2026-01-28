import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  fetchRevenueChart,
  fetchTopProducts,
  fetchPaymentMethods,
  fetchAlerts,
} from "../api/dashboardApi";

export default function useDashboard(from, to) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchDashboardStats(),
      fetchRevenueChart(from, to),
      fetchTopProducts(),
      fetchPaymentMethods(),
      fetchAlerts(),
    ])
      .then(
        ([
          statsRes,
          revenueRes,
          productsRes,
          paymentsRes,
          alertsRes,
        ]) => {
          setStats(statsRes.data.data);
          setRevenue(revenueRes.data.data);
          setProducts(productsRes.data.data);
          setPayments(paymentsRes.data.data);
          setAlerts(alertsRes.data.data);
        }
      )
      .catch((err) => {
        
        console.error("Dashboard API error", err);
      })
      .finally(() => setLoading(false));
  }, [from, to]);

  return {
    loading,
    stats,
    revenue,
    products,
    payments,
    alerts,
  };
}
