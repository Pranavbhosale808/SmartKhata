import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-xl rounded-2xl p-10 sm:p-14 text-center max-w-2xl w-full border border-slate-200"
      >
        {/* Logo Icon */}
        <motion.div
          className="mx-auto mb-6 w-20 h-20 rounded-xl bg-slate-900 flex items-center justify-center text-white text-3xl font-bold shadow-md"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ₹
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
          SmartKhata
        </h1>

        <p className="text-slate-500 text-lg mb-10">
          Smart billing & vendor management.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/register")}
            className="bg-slate-900 text-white hover:bg-slate-800 py-6 px-10 rounded-xl text-lg shadow-md hover:scale-105 transition-all"
          >
            Get Started
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-slate-300 text-slate-700 py-6 px-10 rounded-xl text-lg hover:bg-slate-100 transition-all"
          >
            Login
          </Button>
        </div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-slate-400"
        >
          Manage owe, track payments, and grow your business with confidence
        </motion.p>
      </motion.div>
    </div>
  );
}
