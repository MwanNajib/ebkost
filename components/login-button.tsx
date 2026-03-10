import { FaGoogle } from "react-icons/fa6";

export const LoginGooleButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white font-medium py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer transition-colors duration-200">
      <FaGoogle className="size-5" />
      <span>Sign In With Google</span>
    </button>
  );
};
