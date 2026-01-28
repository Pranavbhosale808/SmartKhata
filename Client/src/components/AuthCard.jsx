import { motion } from "framer-motion";

export default function AuthCard({ children, reverse = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-400 to-green-200 p-10">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-black mb-4">
            SmartKhata
          </h2>
          <p className="text-black/70">
            Smart billing & vendor management made simple.
          </p>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="p-8 md:p-12">{children}</div>
    </motion.div>
  );
}
