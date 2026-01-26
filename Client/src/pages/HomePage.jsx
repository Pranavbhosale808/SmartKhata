import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="py-14 px-6 text-center space-y-6">

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Smart<span className="text-orange-500">Khata</span>
          </h1>

          {/* Quote */}
          <p className="text-gray-600 text-base sm:text-lg">
            Simple billing. Clear records. Smarter business.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="w-full sm:w-40"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-40 border-orange-500 text-orange-500 hover:bg-orange-50"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
