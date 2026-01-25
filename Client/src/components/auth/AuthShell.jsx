import { useLocation, useNavigate } from "react-router-dom";
import AuthIllustration from "./AuthIllustration";

export default function AuthShell({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gray-100 dark:bg-black px-4">

      <div
        className="
        relative w-full max-w-[1200px] h-[650px]
        bg-white dark:bg-neutral-900
        rounded-[2.5rem] shadow-2xl
        overflow-hidden
        hidden md:flex
        "
      >
        {/* FORM */}
        <div
          className={`absolute top-0 h-full w-1/2 flex items-center justify-center
          transition-all duration-700 ease-in-out
          ${isLogin ? "right-0" : "left-0"}`}
        >
          {children}
        </div>

        {/* IMAGE */}
        <div
          className={`absolute top-0 h-full w-1/2
          transition-all duration-700 ease-in-out
          ${isLogin ? "left-0" : "right-0"}`}
        >
          <AuthIllustration
            isLogin={isLogin}
            onClick={() => navigate(isLogin ? "/register" : "/login")}
          />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
