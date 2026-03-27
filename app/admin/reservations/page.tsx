import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { approveReservation, finishReservation } from "@/lib/actions/reservation.action";
import { 
  IoCheckmarkCircle, 
  IoTimeOutline, 
  IoCashOutline, 
  IoCloudUploadOutline, 
  IoCheckmarkDoneCircle
} from "react-icons/io5";

export default async function AdminReservationsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/");

  const reservations = await prisma.reservation.findMany({
    include: {
      room: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Format IDR
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Data Reservasi Kamar</h1>
        <p className="text-gray-500 font-medium italic">Kelola transaksi dan permintaan penyewaan kamar EbKost.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center shadow-sm">
           <p className="text-gray-400 font-medium">Belum ada data reservasi masuk.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* User & Info Room */}
                <div className="flex gap-5 items-center lg:w-1/3">
                  <div className="relative size-20 rounded-2xl overflow-hidden shadow-inner shrink-0 ring-1 ring-gray-100">
                    <Image src={res.room.image} alt={res.room.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 leading-tight mb-1">{res.room.name}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 leading-none">Oleh: {res.user.name}</p>
                    <div className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {formatter.format(res.totalPrice)}
                    </div>
                  </div>
                </div>

                {/* Status & Proof */}
                <div className="lg:w-1/3 flex flex-col gap-3">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status:</span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ring-white/20 backdrop-blur-md ${
                              res.status === 'PENDING' ? 'bg-yellow-500 text-white' : 
                              res.status === 'WAITING_APPROVAL' ? 'bg-blue-500 text-white shadow-blue-100' :
                              res.status === 'SUCCESS' ? 'bg-green-500 text-white shadow-green-100' :
                              res.status === 'CANCELLED' ? 'bg-red-500 text-white shadow-red-100' :
                              'bg-gray-800 text-white'
                           }`}>
                        {res.status === 'PENDING' ? 'Menunggu Bayar' : 
                         res.status === 'WAITING_APPROVAL' ? 'Perlu Verifikasi' : 
                         res.status === 'SUCCESS' ? 'Sewa Aktif' : 
                         res.status === 'CANCELLED' ? 'Batal' : 'Lunas/Selesai'}
                      </span>
                   </div>
                   
                   {res.paymentProof && (
                      <a href={res.paymentProof} target="_blank" className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 underline decoration-blue-200 decoration-2 underline-offset-4 bg-blue-50 w-max px-3 py-1.5 rounded-lg border border-blue-100">
                         <IoCloudUploadOutline size={16} />
                         Lihat Bukti Transfer
                      </a>
                   )}
                </div>

                {/* Actions */}
                <div className="lg:w-1/3 flex justify-end gap-3 w-full border-t lg:border-t-0 pt-4 lg:pt-0">
                  {res.status === "WAITING_APPROVAL" && (
                    <form action={approveReservation.bind(null, res.id)}>
                      <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-100 transition-all active:scale-95">
                        <IoCheckmarkCircle size={18} />
                        Validasi Pembayaran
                      </button>
                    </form>
                  )}
                  {res.status === "SUCCESS" && (
                    <form action={finishReservation.bind(null, res.id)}>
                      <button className="flex items-center gap-2 bg-gray-900 border border-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-gray-200 active:scale-95">
                        <IoCheckmarkDoneCircle size={18} />
                        Selesaikan Sewa (Finish)
                      </button>
                    </form>
                  )}
                  {res.status === "FINISHED" && (
                    <div className="flex items-center gap-2 text-gray-400 font-bold italic text-sm">
                       <IoCheckmarkDoneCircle size={18} />
                       Reservasi Selesai
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
