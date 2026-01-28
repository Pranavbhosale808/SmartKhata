import api from "../utils/axios";

export const ownerSignup = (data) =>
  api.post("/auth/signup/owner", data);

export const staffSignup = (data) =>
  api.post("/auth/signup/staff", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);
