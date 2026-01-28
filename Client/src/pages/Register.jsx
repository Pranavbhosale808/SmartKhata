import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { ownerSignup, staffSignup } from "../api/authApi";
import "../App.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("owner");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    shopName: "",
    ownerName: "",
    phone: "",
    vendorId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const goPage = (path) => {
    const page = document.getElementById("page");
    page.classList.add("fade-out");
    setTimeout(() => navigate(path), 350);
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agree) {
      toast.error("Please accept Terms & Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      if (type === "owner") {
        await ownerSignup({
          shopName: form.shopName,
          ownerName: form.ownerName,
          phone: form.phone,
          name: form.ownerName,
          email: form.email,
          password: form.password,
        });
      } else {
        await staffSignup({
          vendorId: Number(form.vendorId),
          name: form.email.split("@")[0],
          email: form.email,
          password: form.password,
        });
      }

      toast.success("Registration successful. Please login.");
      goPage("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="page"
      className="min-h-screen flex items-center justify-center p-5 page-animate bg-slate-200"
    >
      <div className="bg-white max-w-6xl w-full rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* ================= LEFT : REGISTER ================= */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-sm">

            <h2 className="text-2xl font-semibold text-center text-slate-800">
              Create Account
            </h2>
            <p className="text-center text-sm text-slate-500 mb-4">
              Register as Owner or Staff
            </p>

            <div className="flex bg-slate-100 rounded-full p-1 mb-5">
              {["owner", "staff"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    type === t
                      ? "bg-slate-900 text-white shadow"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {t === "owner" ? "Owner" : "Staff"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={type}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
                onSubmit={handleSubmit}
              >
                {type === "owner" && (
                  <>
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Shop Name"
                      onChange={(e) => handleChange("shopName", e.target.value)}
                    />
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Owner Name"
                      onChange={(e) => handleChange("ownerName", e.target.value)}
                    />
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Phone Number"
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </>
                )}

                {type === "staff" && (
                  <input
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Vendor ID"
                    onChange={(e) => handleChange("vendorId", e.target.value)}
                  />
                )}

                <input
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Password"
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Confirm Password"
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                />

                <label className="flex items-start gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    I agree to the <span className="font-semibold">Terms</span> &{" "}
                    <span className="font-semibold">Privacy</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agree || loading}
                  className={`w-full py-2 rounded-lg text-white font-medium
                    bg-slate-900 shadow-md
                    ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="text-center text-sm mt-4 text-slate-600">
              Already have an account?{" "}
              <span
                onClick={() => goPage("/login")}
                className="font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

          </div>
        </div>

        {/* ================= RIGHT : AI ERA DASHBOARD (UNCHANGED) ================= */}
        <div className="md:w-1/2 relative bg-gradient-to-br 
                        from-slate-900 via-indigo-900 to-purple-900 
                        text-white flex items-center justify-center p-10">

          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative max-w-md w-full space-y-6">

            <div className="transition hover:translate-x-1">
              <h1 className="text-3xl font-bold tracking-tight">
                SmartKhata
              </h1>
              <p className="text-sm text-white/70 mt-1">
                Billing & Credit Tracking System
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 transition hover:-translate-y-1">
                <p className="text-xs text-white/60">Total Balance</p>
                <h2 className="text-xl font-bold">₹ 80,440</h2>
                <p className="text-xs text-purple-300">AI stable trend</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 transition hover:-translate-y-1">
                <p className="text-xs text-white/60">Total Spending</p>
                <h2 className="text-xl font-bold">₹ 64,200</h2>
                <p className="text-xs text-pink-300">Risk detected</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 transition hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-white/80">
                Credit Utilization (AI)
              </h3>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-3xl font-bold">62%</span>
                <span className="text-xs text-purple-300">
                  Predicted safe range
                </span>
              </div>

              <div className="w-full bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
                <div className="h-2 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 w-[62%]" />
              </div>

              <p className="text-xs text-white/60 mt-3">
                ₹ 18,750 of ₹ 30,000 utilized
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 5e4495112a050be655847cf47111205d90b8dc60
