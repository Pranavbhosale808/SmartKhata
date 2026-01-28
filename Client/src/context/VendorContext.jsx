import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVendor = async () => {
      try {
        const cached = localStorage.getItem("vendor");
        if (cached) {
          setVendor(JSON.parse(cached));
        }

        const res = await api.get("/vendor/me");
        setVendor(res.data.data);
        localStorage.setItem("vendor", JSON.stringify(res.data.data));
      } catch (err) {
        console.error("Vendor load failed");
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    loadVendor();
  }, []);

  const saveVendor = (data) => {
    setVendor(data);
    localStorage.setItem("vendor", JSON.stringify(data));
  };

  const clearVendor = () => {
    setVendor(null);
    localStorage.removeItem("vendor");
  };

  return (
    <VendorContext.Provider value={{ vendor, loading, saveVendor, clearVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => useContext(VendorContext);
