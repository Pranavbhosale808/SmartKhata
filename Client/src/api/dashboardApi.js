import api from "../utils/axios";

export const fetchDashboardStats = () =>
  api.get("/dashboard/stats");

export const fetchRevenueChart = (from, to) =>
  api.get("/dashboard/revenue", {
    params: { from, to },
  });

export const fetchTopProducts = () =>
  api.get("/dashboard/top-products");

export const fetchPaymentMethods = () =>
  api.get("/dashboard/payment-methods");

export const fetchAlerts = () =>
  api.get("/dashboard/alerts");
