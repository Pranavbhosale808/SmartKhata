import { Button } from "@/components/ui/button";

export default function AuthIllustration({ isLogin, onClick }) {
  return (
    <div
      className="
      h-full w-full
      flex flex-col justify-center items-center
      px-14
      bg-gradient-to-br
      from-orange-500 to-orange-700
      dark:from-neutral-800 dark:to-neutral-950
      text-white
      rounded-[2.5rem]
      "
    >
      <h1 className="text-5xl font-bold mb-6 text-center">
        {isLogin ? "Manage your money" : "Grow your business"}
      </h1>

      <p className="text-lg opacity-80 mb-10 text-center">
        SmartKhata+ helps you manage everything in one place.
      </p>

      <img
        src="https://i.imgur.com/WbQnbas.png"
        alt="illustration"
        className="w-[320px] mb-10 drop-shadow-2xl"
      />

      <Button
        onClick={onClick}
        className="
        px-10 py-6 text-lg rounded-full
        bg-white text-orange-600
        hover:bg-gray-100
        dark:bg-black dark:text-white dark:hover:bg-neutral-800
        "
      >
        {isLogin ? "Sign Up" : "Sign In"}
      </Button>
    </div>
  );
}
