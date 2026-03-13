import Link from "next/link";
import { IoShieldOutline, IoArrowBackOutline } from "react-icons/io5";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-red-50 text-red-500 mb-6 animate-pulse">
          <IoShieldOutline size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Akses Terbatas</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Maaf, akun Anda tidak memiliki izin untuk mengakses halaman ini. 
          Halaman ini hanya ditujukan untuk Administrator.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-200"
          >
            <IoArrowBackOutline size={20} />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <p className="text-xs text-gray-400">
            Jika ini kesalahan, hubungi IT Support EbKost.
          </p>
        </div>
      </div>
    </div>
  );
}
