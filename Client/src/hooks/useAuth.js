import { loginApi, registerApi } from "@/api/authApi";

export const useAuth = () => {

  const login = async (payload) => {
    const res = await loginApi(payload);
    saveSession(res.data);
    return res.data;
  };

  const register = async (payload) => {
    const res = await registerApi(payload);
    saveSession(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.clear();
  };

  const saveSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("tenantId", data.tenantId);
    localStorage.setItem("role", data.role);
  };

  return { login, register, logout };
};
