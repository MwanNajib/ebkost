import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackOutline, IoCheckmarkCircle, IoPersonOutline, IoPricetagOutline } from "react-icons/io5";

export default async function ViewRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      roomAmenities: {
        include: {
          amenities: true
        }
      },
    },
  });

  if (!room) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header and Back Link */}
      <div className="flex items-center justify-between mb-8 mt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/room"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            title="Kembali"
          >
            <IoArrowBackOutline size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-[#1a2332]">Room Details</h1>
        </div>
        <Link
          href={`/admin/room/${room.id}/edit`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md font-semibold transition-colors shadow-sm text-sm"
        >
          Edit Room
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Image */}
        <div className="w-full h-80 sm:h-96 relative bg-gray-100 border-b border-gray-100">
          {room.image && room.image.startsWith("/") ? (
            <Image 
              src={room.image} 
              alt={room.name} 
              fill 
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex w-full h-full items-center justify-center text-gray-400">
              No Image Uploaded
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{room.name}</h2>
              <p className="text-sm text-gray-500">
                Ditambahkan pada: {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "long"
                }).format(room.createdAt)}
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <div className="flex items-center gap-2 text-2xl font-bold text-orange-600">
                <IoPricetagOutline />
                <span>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(room.price)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <IoPersonOutline />
                <span>Kapasitas: {room.capacity} Orang</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-50 pb-2">
              Deskripsi Kamar
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {room.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">
              Fasilitas (Amenities)
            </h3>
            {room.roomAmenities.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.roomAmenities.map((ra) => (
                  <div key={ra.amenities.id} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <IoCheckmarkCircle className="text-green-500 size-5" />
                    <span className="font-medium text-sm">{ra.amenities.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Tidak ada fasilitas yang ditambahkan secara spesifik.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
