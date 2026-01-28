import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  CreditCard,
  LogOut,
  User,
} from "lucide-react";
import { getUserFromToken, logout } from "../utils/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const menu = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/dashboard/products", icon: Package },
  { name: "Bills", path: "/dashboard/bills", icon: FileText },
  { name: "Payments", path: "/dashboard/payments", icon: CreditCard },
];

export default function Sidebar() {
  const user = getUserFromToken();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black text-white flex flex-col">
      {/* Profile */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          <User className="text-black" />
        </div>
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-white/60">{user?.role}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-white/10"
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        onClick={() => {
          logout();
          navigate("/login");
          toast.success("Logged out successfully");
        }}
        className="flex items-center gap-3 px-6 py-4 border-t border-white/10 hover:bg-white/10 transition"
      >
        <LogOut size={18} />
        Logout
      </motion.button>
    </aside>
  );
}
