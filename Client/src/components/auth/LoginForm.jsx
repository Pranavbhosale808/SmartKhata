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

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({ email: "", password: "" });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(form);
      toast.success("Login successful");
      navigate("/products");
    } catch (err) {
      toast.error(getErrorMessage(err));
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[420px] p-10 space-y-6 bg-white dark:bg-neutral-900">
      <h2 className="text-3xl font-semibold text-black dark:text-white">
        Sign In
      </h2>

      <form onSubmit={submit} className="space-y-4">
        {/* EMAIL */}
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD WITH TOGGLE */}
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

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Card>
  );
}
