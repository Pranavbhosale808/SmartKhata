import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.sub,
      vendorId: decoded.vendorId,
      role: decoded.role,
      name: decoded.name,
    };
  } catch {
    return null;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
};
