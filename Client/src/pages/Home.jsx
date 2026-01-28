import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-4xl font-bold text-black mb-4">
          SmartKhata
        </h1>

        <p className="text-black/60 mb-10">
          Smart billing & vendor management made simple.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white py-6 rounded-xl"
          >
            Register
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-black/20 text-black py-6 rounded-xl"
          >
            Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
