import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline, IoCloseCircle } from "react-icons/io5";

interface RoomProps {
  id: string;
  name: string;
  price: number;
  capacity: number;
  image: string;
  description: string;
  isAvailable: boolean;
  roomAmenities: {
    amenities: {
      id: string;
      name: string;
    }
  }[];
}

const Card = ({ room, isLoggedIn }: { room: RoomProps; isLoggedIn: boolean }) => {
  const bookingUrl = isLoggedIn ? `/rooms/${room.id}` : `/signin?callbackUrl=/rooms/${room.id}`;

  return (
    <div className={`bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm flex flex-col group ${!room.isAvailable ? "opacity-80" : ""}`}>
      {/* Image */}
      <div className="h-[240px] w-full rounded-t-sm relative bg-gray-100 overflow-hidden">
        {room.image && room.image.startsWith("/") ? (
          <Image
            src={room.image}
            fill
            alt={room.name}
            className={`w-full h-full object-cover rounded-t-sm transition-transform duration-500 ${room.isAvailable ? "group-hover:scale-105" : "grayscale"}`}
          />
        ) : (
          <div className="flex w-full h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Sold Out Overlay */}
        {!room.isAvailable && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-xl border-2 border-gray-300 rotate-[-8deg]">
              <span className="font-black text-gray-700 text-sm uppercase tracking-widest">
                Tidak Tersedia
              </span>
            </div>
          </div>
        )}

        {/* Available badge */}
        {room.isAvailable && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Tersedia
            </span>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h4 className="text-xl md:text-2xl font-bold line-clamp-1 mb-1">
          <Link
            href={`/rooms/${room.id}`}
            className="hover:text-orange-500 transition duration-150 title-font text-gray-900"
          >
            {room.name}
          </Link>
        </h4>
        
        {/* Fasilitas Kamar Terbatas (Max 3) */}
        {room.roomAmenities && room.roomAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 mt-1">
            {room.roomAmenities.slice(0, 3).map((ra) => (
              <span key={ra.amenities.id} className="bg-orange-50 text-orange-600 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                {ra.amenities.name}
              </span>
            ))}
            {room.roomAmenities.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
                +{room.roomAmenities.length - 3} lainnya
              </span>
            )}
          </div>
        )}

        <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed">
          {room.description || "Deskripsi belum tersedia untuk kamar ini."}
        </p>

        <h4 className="text-xl md:text-2xl mb-6 mt-auto">
          <span className={`font-bold ${room.isAvailable ? "text-orange-600" : "text-gray-400"}`}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(room.price)}
          </span>
          <span className="text-gray-400 text-sm font-medium">/Bulan</span>
        </h4>

        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
          <div className="flex items-center space-x-2 text-gray-600 font-medium">
            <IoPeopleOutline size={20} className="text-orange-500" />
            <span>Kapasitas {room.capacity}</span>
          </div>

          {room.isAvailable ? (
            <Link
              href={bookingUrl}
              className="px-6 py-2 md:px-8 md:py-2.5 font-bold text-white bg-orange-400 rounded-lg hover:bg-orange-500 transition-all shadow-md shadow-orange-200 hover:shadow-lg active:scale-95"
            >
              Sewa
            </Link>
          ) : (
            <span className="px-6 py-2 md:px-8 md:py-2.5 font-bold text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed flex items-center gap-1.5 text-sm">
              <IoCloseCircle size={16} />
              Penuh
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
