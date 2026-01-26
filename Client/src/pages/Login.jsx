import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { loginUser } from "../api/authApi";
  import { toast } from "react-toastify";
  import "../App.css"

  export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    const [loading, setLoading] = useState(false);

    const goPage = (path) => {
      const page = document.getElementById("page");
      page.classList.add("fade-out");
      setTimeout(() => navigate(path), 350);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const res = await loginUser(form);

        
        localStorage.setItem("token", res.data.data.token);

        toast.success("Login successful");
        goPage("/dashboard");
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Invalid email or password"
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

          {/* ================= LEFT : SMARTKHATA AI PANEL ================= */}
          <div
            className="md:w-1/2 relative flex items-center justify-center
                      bg-gradient-to-br from-[#0f0f1a] via-[#1b1b3a] to-[#2a0f45]
                      transition-all duration-500 hover:brightness-110"
          >
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />

            <div className="relative w-[75%] space-y-8 text-white">
              <div className="flex justify-between opacity-80">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur shadow-inner transition hover:scale-110" />
                <div className="w-10 h-10 rounded-full bg-fuchsia-400/40 transition hover:scale-125" />
                <div className="w-14 h-14 rotate-45 bg-violet-400/30 transition hover:rotate-[65deg]" />
                <div className="w-10 h-10 rounded-full bg-pink-400/40 transition hover:scale-125" />
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-2xl font-extrabold tracking-wide">
                  SmartKhata
                </h1>
                <p className="text-sm font-semibold text-white/80 tracking-wider">
                  Smart Billing • Credit Monitoring • Payment Discipline
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 transition hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-end gap-4 h-32">
                  {[35, 60, 45, 75, 55, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-lg transition-all duration-500 hover:scale-y-110"
                      style={{
                        height: `${h}%`,
                        background:
                          "linear-gradient(180deg, rgba(192,132,252,.95), rgba(244,114,182,.95))",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs text-white/80 text-center -mt-3">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
                  Invoice Control
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
                  Credit Safety
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
                  Staff Tracking
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT : LOGIN ================= */}
          <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-sm">

              <h2 className="text-2xl font-semibold text-center text-slate-800">
                Welcome Back
              </h2>
              <p className="text-center text-slate-500 text-sm mb-6">
                Login to your SmartKhata account
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <div className="flex justify-between items-center text-sm text-slate-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <span className="cursor-pointer font-semibold">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-lg text-white font-medium
                            bg-slate-900 hover:bg-black shadow-md transition
                            disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center text-sm mt-4 text-slate-600">
                Don’t have an account?{" "}
                <span
                  onClick={() => goPage("/register")}
                  className="font-semibold cursor-pointer"
                >
                  Create Account
                </span>
              </p>

            </div>
          </div>

        </div>
      </div>
    );
  }