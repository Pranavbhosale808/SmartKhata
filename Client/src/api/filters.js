import api from "./axios";

export const getBillsByStatus = (status, page = 0) =>
  api.get("/bills/status", { params: { status, page, size: 10 } });

export const getBillsByDateRange = (start, end, page = 0) =>
  api.get("/bills/date-range", { params: { start, end, page, size: 10 } });
