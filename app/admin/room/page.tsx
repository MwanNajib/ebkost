import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { IoPencilOutline, IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import DeleteRoomButton from "@/components/admin/room/delete-button";
import ToggleAvailabilityButton from "@/components/admin/room/toggle-availability-button";

export default async function RoomListPage() {
  const rooms = await prisma.room.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          reservations: {
            where: {
              status: { in: ["PENDING", "WAITING_APPROVAL", "SUCCESS"] }
            }
          }
        }
      }
    }
  });

  return (
    <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a2332]">Daftar Kamar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola ketersediaan kamar — toggle status untuk menandai <span className="font-semibold text-green-600">Tersedia</span> atau <span className="font-semibold text-red-600">Sold Out</span>.
          </p>
        </div>
        <Link
          href="/admin/room/create"
          className="bg-[#f08519] hover:bg-[#d67212] text-white px-6 py-2.5 rounded-md font-semibold transition-colors shadow-sm"
        >
          Tambah Kamar Baru
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-gray-100 uppercase text-xs font-bold text-gray-500 tracking-wider">
              <th className="py-4 px-4 whitespace-nowrap">Gambar</th>
              <th className="py-4 px-4 whitespace-nowrap">Nama Kamar</th>
              <th className="py-4 px-4 whitespace-nowrap">Harga Sewa</th>
              <th className="py-4 px-4 whitespace-nowrap text-center">Reservasi Aktif</th>
              <th className="py-4 px-4 whitespace-nowrap text-center">Status Kamar</th>
              <th className="py-4 px-4 whitespace-nowrap">Tgl Dibuat</th>
              <th className="py-4 px-4 whitespace-nowrap text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  Belum ada data kamar. Silakan buat data baru.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Gambar */}
                  <td className="py-4 px-4">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200">
                      {room.image && room.image.startsWith("/") ? (
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                      {/* Sold out overlay on image */}
                      {!room.isAvailable && (
                        <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                          <span className="text-white font-black text-[10px] uppercase tracking-widest rotate-[-15deg] border-2 border-white/80 px-2 py-0.5 rounded">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Nama */}
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {room.name}
                  </td>

                  {/* Harga */}
                  <td className="py-4 px-4 text-gray-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(room.price)}
                  </td>

                  {/* Reservasi Aktif */}
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center justify-center size-8 rounded-full text-sm font-bold ${
                      room._count.reservations > 0
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {room._count.reservations}
                    </span>
                  </td>

                  {/* Toggle Status */}
                  <td className="py-4 px-4 text-center">
                    <ToggleAvailabilityButton id={room.id} isAvailable={room.isAvailable} />
                  </td>

                  {/* Tanggal */}
                  <td className="py-4 px-4 text-gray-500 text-sm">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(room.createdAt)}
                  </td>

                  {/* Aksi */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-4 text-gray-400">
                      <Link
                        href={`/admin/room/${room.id}`}
                        className="hover:text-green-600 transition-colors"
                        title="View Room"
                      >
                        <IoEyeOutline className="size-5" />
                      </Link>
                      <Link
                        href={`/admin/room/${room.id}/edit`}
                        className="hover:text-blue-600 transition-colors"
                        title="Edit Room"
                      >
                        <IoPencilOutline className="size-5" />
                      </Link>
                      <DeleteRoomButton id={room.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
