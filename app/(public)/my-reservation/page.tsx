import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoChevronForwardOutline, IoReceiptOutline } from "react-icons/io5";
import ReservationList from "@/components/reservation/reservation-list";

export default async function MyReservationPage() {
  const session = await auth();
  if (!session) redirect("/signin");

  const reservations = await prisma.reservation.findMany({
    where: { userId: session.user?.id },
    include: { room: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  // Format IDR
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 pt-10 mt-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Riwayat Reservasi</h1>
              <p className="text-gray-500 font-medium">Pantau status pemesanan dan pembayaran kamar kost Anda.</p>
           </div>
           <Link href="/#rooms" className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              Pesan Kamar Lagi
              <IoChevronForwardOutline size={16} />
           </Link>
        </div>

        {reservations.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
             <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoReceiptOutline size={32} className="text-gray-200" />
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Belum ada reservasi</h2>
             <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm leading-relaxed">Sepertinya Anda belum melakukan pemesanan kamar kost di EbKost baru-baru ini.</p>
             <Link href="/#rooms" className="bg-orange-500 text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-95">Mulai Cari Kamar</Link>
          </div>
        ) : (
          <ReservationList 
            reservations={reservations} 
          />
        )}

      </div>
    </div>
  );
}
