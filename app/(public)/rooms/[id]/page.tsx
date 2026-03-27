import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoPeopleOutline, 
  IoCheckmarkCircleOutline,
  IoLogoWhatsapp,
  IoCloseCircleOutline,
  IoAlertCircleOutline
} from "react-icons/io5";
import { createReservation } from "@/lib/actions/reservation.action";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const room = await prisma.room.findUnique({ where: { id: resolvedParams.id } });
  return {
    title: `EbKost - ${room?.name || "Detail Kamar"}`,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      roomAmenities: {
        include: {
          amenities: true
        }
      }
    }
  });

  if (!room) {
    notFound();
  }

  // Format IDR
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 pt-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tombol Kembali */}
        <Link 
          href="/#rooms" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-bold mb-8 transition-colors group"
        >
          <div className="size-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-orange-50">
            <IoArrowBackOutline size={20} />
          </div>
          <span>Kembali ke Daftar</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Kolom Kiri: Foto & Detail */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative h-[400px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
              {room.image ? (
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
                  Foto Tidak Tersedia
                </div>
              )}
              {/* Badge Harga Over Image */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                <p className="text-sm font-bold text-gray-500 mb-0.5">Mulai Dari</p>
                <h2 className="text-2xl font-black text-orange-600">{formatter.format(room.price)}<span className="text-sm text-gray-400 font-medium italic"> / Bulan</span></h2>
              </div>

              {/* Sold Out Banner Over Image */}
              {!room.isAvailable && (
                <div className="absolute inset-0 bg-gray-900/55 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-10 py-3 rounded-full shadow-2xl border-2 border-gray-400 -rotate-6">
                    <span className="font-black text-gray-700 text-xl uppercase tracking-widest">Tidak Tersedia</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{room.name}</h1>
                  <div className="flex items-center gap-4 text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                      <IoPeopleOutline size={18} />
                      Kapasitas {room.capacity} Orang
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full mb-8" />

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Tentang Kamar Ini</h2>
                <p className="text-gray-600 leading-loose text-lg whitespace-pre-line">
                  {room.description || "Deskripsi untuk kamar ini belum ditambahkan pihak pengelola EbKost."}
                </p>
              </div>

              <div className="h-px bg-gray-100 w-full my-10" />

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Fasilitas Kost</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {room.roomAmenities.length > 0 ? (
                    room.roomAmenities.map((ra) => (
                      <div key={ra.id} className="flex items-center gap-3 text-gray-700 font-semibold bg-gray-50 p-4 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-all cursor-default group">
                        <IoCheckmarkCircleOutline className="text-orange-500 group-hover:scale-110 transition-transform" size={24} />
                        <span>{ra.amenities.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">Fasilitas umum standar tersedia.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-orange-100 ring-8 ring-orange-50/50">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Pesan Sekarang</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-gray-600 font-medium">
                    <span>Sewa Kamar</span>
                    <span className="text-gray-900 font-bold">{formatter.format(room.price)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 font-medium">
                    <span>Biaya Layanan</span>
                    <span className="text-green-600 font-bold">Gratis</span>
                  </div>
                  <div className="h-px bg-gray-100 w-full" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total Tagihan</span>
                    <span className="text-2xl font-black text-orange-600">{formatter.format(room.price)}</span>
                  </div>
                </div>

                {!room.isAvailable ? (
                  // ── KAMAR TIDAK TERSEDIA ────────────────────────────
                  <div className="mb-4 bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="size-12 bg-red-100 rounded-full flex items-center justify-center">
                        <IoCloseCircleOutline size={28} className="text-red-500" />
                      </div>
                    </div>
                    <h4 className="font-black text-red-700 text-sm uppercase tracking-wider mb-1">Kamar Tidak Tersedia</h4>
                    <p className="text-red-500 text-xs leading-relaxed">
                      Kamar ini sedang tidak tersedia untuk dipesan. Silakan hubungi admin atau pilih kamar lain.
                    </p>
                  </div>
                ) : !session ? (
                  <Link
                    href={`/signin?callbackUrl=/rooms/${id}`}
                    className="block w-full text-center bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 mb-4"
                  >
                    Login Untuk Memesan
                  </Link>
                ) : (
                  <form action={createReservation.bind(null, id)}>
                    <button
                      type="submit"
                      className="block w-full text-center bg-orange-500 text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 active:scale-95 mb-4"
                    >
                      Booking Kamar Ini
                    </button>
                  </form>
                )}

                <p className="text-center text-gray-400 text-xs font-medium">
                  Informasi lebih lanjut? <br /> Hubungi Admin via WhatsApp
                </p>
                
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 border-2 border-green-500 text-green-600 font-bold rounded-2xl hover:bg-green-50 transition-colors"
                >
                  <IoLogoWhatsapp size={20} />
                  Chat Sekarang
                </a>
              </div>

              {/* Tips Keamanan */}
              <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl">
                <h4 className="text-blue-800 font-bold text-sm mb-2 uppercase tracking-wider">Garansi Keamanan</h4>
                <p className="text-blue-600 text-xs leading-relaxed">
                  Semua transaksi di EbKost terlindungi oleh sistem kami. Pastikan pembayaran hanya melalui panel resmi atau konfirmasi Admin EbKost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
