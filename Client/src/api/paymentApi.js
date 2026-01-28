import api from "./axios";

// create razorpay order
export const createRazorpayOrder = (data) =>
  api.post("/payments/razorpay/order", data);

// verify razorpay payment
export const verifyRazorpayPayment = (data) =>
  api.post("/payments/razorpay/verify", data);

// record cash payment
export const recordCashPayment = (data) =>
  api.post("/payments/cash", data);


export const getPayments = (params) =>
  api.get("/payments", { params });

export const getPaymentsByDateRange = (start, end, page = 0, size = 10) =>
  api.get("/payments/date-range", {
    params: { start, end, page, size },
  });

