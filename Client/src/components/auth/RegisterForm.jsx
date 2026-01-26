import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/errorHandler";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({
      shopName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validate = () => {
    if (
      !form.shopName ||
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        shopName: form.shopName,
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err));
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[420px] p-10 space-y-5 bg-white dark:bg-neutral-900">
      <h2 className="text-3xl font-semibold text-black dark:text-white">
        Create Account
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <Input
          placeholder="Shop Name"
          value={form.shopName}
          onChange={(e) =>
            setForm({ ...form, shopName: e.target.value })
          }
        />

        <Input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="pr-12"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-500 hover:text-gray-700
                             dark:text-gray-400 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {showPassword ? "Hide password" : "Show password"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="pr-12"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-500 hover:text-gray-700
                             dark:text-gray-400 dark:hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {showConfirmPassword ? "Hide password" : "Show password"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Creating..." : "Sign Up"}
        </Button>
      </form>
    </Card>
  );
}
