"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { 
  IoCashOutline, 
  IoCloudUploadOutline, 
  IoInformationCircleOutline, 
  IoCheckmarkCircle,
  IoLogoWhatsapp
} from "react-icons/io5";
import { checkPaymentStatus, getSnapToken } from "@/lib/actions/midtrans.action";
import { uploadPaymentProof } from "@/lib/actions/reservation.action";
import Script from "next/script";
import { IoReloadOutline } from "react-icons/io5";

interface CheckoutClientProps {
  reservation: any;
  formattedPrice: string;
}

export default function CheckoutClient({ reservation, formattedPrice }: CheckoutClientProps) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);

  const handleRefreshStatus = async () => {
    setRefreshing(true);
    const result = await checkPaymentStatus(reservation.id);
    if (result.status === "SUCCESS") {
       setMessage({ type: 'success', text: "Pembayaran terverifikasi! Mengalihkan ke riwayat sewa..." });
       setTimeout(() => window.location.reload(), 1500);
    } else {
       setMessage({ type: 'info', text: "Status Pembayaran: " + (result.status || "Belum Bayar") });
    }
    setRefreshing(false);
  };

  const handleMidtransPayment = async () => {
    setLoading(true);
    try {
      const snapToken = await getSnapToken(reservation.id);
      
      // @ts-ignore
      window.snap.pay(snapToken, {
        onSuccess: function(result: any) {
          window.location.reload();
        },
        onPending: function(result: any) {
          window.location.reload();
        },
        onError: function(result: any) {
          setMessage({ type: 'error', text: "Gagal memproses pembayaran. Silakan coba lagi." });
        },
        onClose: function() {
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: "Terjadi kesalahan saat menghubungi server pembayaran." });
      setLoading(false);
    }
  };

  const handleUploadProof = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData(e.currentTarget);
    const result = await uploadPaymentProof(reservation.id, formData);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: result.success as string });
      // Reload page to update UI status
      setTimeout(() => window.location.reload(), 2000);
    }
    setUploading(false);
  };

  return (
    <>
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left: Summary & Payment Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
             <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <IoInformationCircleOutline className="text-orange-500" size={24} />
                Detail Pesanan
             </h3>
             
             <div className="flex gap-4 items-center mb-8 bg-gray-50 p-4 rounded-2xl ring-1 ring-gray-100">
                <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
                   <Image src={reservation.room.image} alt={reservation.room.name} fill className="object-cover" />
                </div>
                <div>
                   <h4 className="font-bold text-gray-900">{reservation.room.name}</h4>
                   <p className="text-xs text-gray-500 font-medium italic">Kost EbKost PDG, Indonesia</p>
                </div>
             </div>

             <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between py-2 border-b border-gray-50">
                   <span className="text-gray-400">Atas Nama</span>
                   <span className="text-gray-900">{reservation.user.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                   <span className="text-gray-400">Total Pembayaran</span>
                   <span className="text-orange-600 font-black text-lg">{formattedPrice}</span>
                </div>
                <div className="flex justify-between py-2 items-center">
                   <span className="text-gray-400">Status Saat Ini</span>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      reservation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                      reservation.status === 'WAITING_APPROVAL' ? 'bg-blue-100 text-blue-700' :
                      reservation.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 
                      'bg-gray-100 text-gray-700'
                   }`}>
                      {reservation.status === 'PENDING' ? 'Belum Bayar' : 
                       reservation.status === 'WAITING_APPROVAL' ? 'Menunggu Konfirmasi' : 
                       reservation.status === 'SUCCESS' ? 'LUNAS / AKTIF' : 'Sukses'}
                   </span>
                </div>
                {reservation.status === 'PENDING' && (
                  <button 
                    onClick={handleRefreshStatus}
                    disabled={refreshing}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-50 hover:text-orange-600 transition-all border border-gray-100"
                  >
                    <IoReloadOutline className={refreshing ? "animate-spin" : ""} size={14} />
                    {refreshing ? "Mengecek..." : "Cek Status Pembayaran (Refresh)"}
                  </button>
                )}
             </div>
          </div>

          {(reservation.status === 'SUCCESS' || reservation.status === 'FINISHED') ? (
            <div className="bg-green-500 p-10 rounded-3xl text-white text-center shadow-xl shadow-green-100">
               <div className="size-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IoCheckmarkCircle size={60} className="text-white" />
               </div>
               <h3 className="text-3xl font-black mb-2">Selamat!</h3>
               <p className="text-green-50 font-medium mb-8">Pembayaran Anda telah berhasil diverifikasi. Selamat bergabung di keluarga besar EbKost!</p>
               <Link 
                  href="/my-reservation"
                  className="inline-block bg-white text-green-600 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-50 transition-all active:scale-95"
               >
                  Lihat Riwayat Sewa &rarr;
               </Link>
            </div>
          ) : (
            <div className="bg-[#1a2332] p-8 rounded-3xl text-white shadow-xl">
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <IoCashOutline size={20} className="text-orange-400" />
                  Metode 1: Pembayaran Otomatis
               </h3>
               <p className="text-sm text-gray-400 mb-6">Nikmati kemudahan pembayaran via Virtual Account, E-Wallet, atau Kartu Kredit melalui Midtrans.</p>
               <button 
                  onClick={handleMidtransPayment}
                  disabled={loading || reservation.status !== 'PENDING'}
                  className="w-full bg-[#f08519] hover:bg-[#d67212] py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-900/20 active:scale-95"
               >
                  {loading ? "Menghubungkan..." : "Pilih Metode Pembayaran"}
               </button>
            </div>
          )}
        </div>

        {/* Right: Manual Proof Upload */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <IoCloudUploadOutline size={120} />
             </div>
             
             <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <IoCloudUploadOutline className="text-blue-500" size={24} />
                Metode 2: Manual Transfer
             </h3>
             
             <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
                <p className="text-sm font-bold text-blue-900 mb-2">Transfer ke Rekening EbKost:</p>
                <div className="space-y-1">
                   <p className="text-sm text-blue-800"><span className="font-black">BCA:</span> 1234567890 a/n EbKost</p>
                   <p className="text-sm text-blue-800"><span className="font-black">Mandiri:</span> 0987654321 a/n EbKost</p>
                </div>
             </div>

             {message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-bounce ${
                   message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                   {message.type === 'success' && <IoCheckmarkCircle size={20} />}
                   {message.text}
                </div>
             )}

             <form onSubmit={handleUploadProof} className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-3 ml-1 tracking-widest">Unggah Bukti Transfer</label>
                   <div className="border-2 border-dashed border-gray-100 p-4 rounded-2xl hover:border-blue-400 transition-all cursor-pointer bg-gray-50/50 group relative h-32 flex flex-col items-center justify-center">
                      <IoCloudUploadOutline size={30} className="text-gray-300 group-hover:text-blue-500 mb-2 transition-colors" />
                      <span className="text-xs text-gray-400 font-bold group-hover:text-blue-700">Klik untuk pilih file foto</span>
                      <input 
                        type="file" 
                        name="proof" 
                        accept="image/*" 
                        required
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={reservation.status !== 'PENDING' && reservation.status !== 'WAITING_APPROVAL'} 
                      />
                   </div>
                </div>

                <button 
                   type="submit"
                   disabled={uploading || (reservation.status !== 'PENDING' && reservation.status !== 'WAITING_APPROVAL')}
                   className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all disabled:opacity-30 active:scale-95"
                >
                   {uploading ? "Mengirim..." : (reservation.status === 'WAITING_APPROVAL' ? "Kirim Ulang Bukti" : "Upload Bukti Bayar")}
                </button>
             </form>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
             <div className="flex items-start gap-4">
                <div className="size-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                   <IoLogoWhatsapp className="text-orange-600" size={24} />
                </div>
                <div>
                   <h4 className="font-black text-orange-900 text-sm">Butuh bantuan?</h4>
                   <p className="text-xs text-orange-700 font-medium leading-relaxed">Hubungi admin EbKost jika Anda butuh panduan dalam pembayaran manual atau ingin konfirmasi cepat.</p>
                   <a href="https://wa.me/6281234567890" target="_blank" className="inline-block mt-3 text-sm font-black text-orange-600 hover:text-orange-800">Chat ke Admin &rarr;</a>
                </div>
             </div>
          </div>
        </div>

      </div>
    </>
  );
}
