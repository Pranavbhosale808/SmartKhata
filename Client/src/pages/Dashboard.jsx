import { motion } from "framer-motion";
import DashboardLayout from "../layouts/DashboardLayout";
import { getUserFromToken } from "../utils/auth";

export default function Dashboard() {
  const user = getUserFromToken();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-black mb-4">
            Welcome, {user?.name}
          </h1>

          <p className="text-black/60 text-lg mb-6">
            Logged in as{" "}
            <span className="font-semibold">{user?.role}</span>
          </p>

          <div className="text-green-500 font-medium text-lg">
            SmartKhata Dashboard
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
