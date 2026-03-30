"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";
import { useState } from "react";

export default function SignInClient() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-amber-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      {/* Floating dots pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md mx-4">
        {/* Glass card */}
        <div
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-200/40 border border-white/60 overflow-hidden"
          style={{ padding: "48px 40px" }}
        >
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-linear-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-300/50 mb-4">
              <MdApartment className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              di{" "}
              <span className="font-semibold text-orange-500">
                E-Booking Kost
              </span>{" "}
              — Platform Booking Kost.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
              Masuk dengan
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            id="btn-google-signin"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-orange-300 hover:shadow-md transition-all duration-200 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaGoogle className="w-5 h-5 text-[#4285f4] group-hover:scale-110 transition-transform duration-200" />
            )}
            <span className="font-semibold text-gray-700 text-sm">
              {isLoading ? "Memproses..." : "Lanjutkan dengan Google"}
            </span>
          </button>

          {/* Info text */}
          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            Dengan masuk, Anda menyetujui{" "}
            <span className="text-orange-500 font-medium cursor-pointer hover:underline">
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="text-orange-500 font-medium cursor-pointer hover:underline">
              Kebijakan Privasi
            </span>{" "}
            kami.
          </p>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 MWAN. All rights reserved.
        </p>
      </div>
    </div>
  );
}
