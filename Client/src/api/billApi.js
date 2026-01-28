import api from "./axios";

// ================= BILL CRUD =================

export const getBills = (params) =>
  api.get("/bills", { params });

export const getBillById = (id) =>
  api.get(`/bills/${id}`);

export const createBill = (data) =>
  api.post("/bills", data);

export const updateBill = (id, data) =>
  api.put(`/bills/${id}`, data);

export const deleteBill = (id) =>
  api.delete(`/bills/${id}`);

// ================= FILTERS =================

export const getBillsByStatus = (status, page = 0, size = 5) =>
  api.get("/bills/status", {
    params: { status, page, size }
  });

export const getBillsByDateRange = (start, end, page = 0, size = 5) =>
  api.get("/bills/date-range", {
    params: { start, end, page, size }
  });

// ================= PAYMENT HOOK (later Razorpay) =================

export const markBillPaid = (id, orderId) =>
  api.post(`/bills/${id}/mark-paid`, null, {
    params: { orderId }
  });
