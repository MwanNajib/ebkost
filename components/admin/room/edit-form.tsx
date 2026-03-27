"use client";

import { useActionState } from "react";
import { updateRoom } from "@/lib/actions/room.action";
import { IoCloudUploadOutline } from "react-icons/io5";

interface EditFormProps {
  room: {
    id: string;
    name: string;
    description: string;
    capacity: number;
    price: number;
    image: string;
    roomAmenities: { amenityId: string }[];
  };
  amenities: {
    id: string;
    name: string;
  }[];
}

export default function EditForm({ room, amenities }: EditFormProps) {
  const updateRoomWithId = updateRoom.bind(null, room.id);
  const [state, formAction, isPending] = useActionState(updateRoomWithId, null);

  const selectedAmenities = room.roomAmenities.map((ra) => ra.amenityId);

  return (
    <form action={formAction} className="mt-6 flex flex-col md:flex-row gap-8">
      {/* Left Column */}
      <div className="flex-1 space-y-6">
        <div>
          <input
            type="text"
            name="name"
            defaultValue={room.name}
            placeholder="Nama Kamar / No. Kamar..."
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <textarea
            name="description"
            rows={8}
            defaultValue={room.description}
            placeholder="Deskripsi Lengkap Kamar (Fasilitas, Kelebihan, dll)..."
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400 resize-none"
          ></textarea>
        </div>

        <div>
          <p className="text-gray-700 text-sm font-semibold mb-3">Fasilitas Tersedia</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  name="amenities"
                  value={item.id}
                  defaultChecked={selectedAmenities.includes(item.id)}
                  className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        {/* Upload Image Area */}
        <label 
          className="border-2 border-dashed border-gray-200 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors h-48 relative overflow-hidden group"
          style={{
            backgroundImage: room.image && room.image.startsWith("/") ? `url(${room.image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={`flex flex-col items-center pointer-events-none transition-opacity ${room.image && room.image.startsWith("/") ? 'opacity-0' : 'opacity-100'}`}>
            <IoCloudUploadOutline className="size-8 text-gray-400 mb-2 group-hover:text-orange-500 transition-colors" />
            <p className="text-sm font-semibold text-gray-700">Ganti Foto Kamar</p>
            <p className="text-[11px] text-gray-400 mt-1 px-4">
              Pilih file foto baru (JPG, PNG) jika ingin mengubah
            </p>
          </div>
          
          <input 
            type="file" 
            name="image"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                e.currentTarget.parentElement!.style.backgroundImage = `url(${url})`;
                Array.from(e.currentTarget.parentElement!.children).forEach(child => {
                  if (child.tagName !== 'INPUT') (child as HTMLElement).style.opacity = '0';
                });
              }
            }}
          />
        </label>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Kapasitas Orang</label>
          <input
            type="number"
            name="capacity"
            defaultValue={room.capacity}
            placeholder="Kapasitas (Orang)..."
            min={1}
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Harga per Bulan</label>
          <input
            type="number"
            name="price"
            defaultValue={room.price}
            placeholder="Harga per Bulan..."
            min={0}
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm mt-2">{state.error}</div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#f08519] hover:bg-[#d67212] text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-md shadow-orange-100 hover:shadow-lg active:scale-95 disabled:opacity-50 mt-auto"
        >
          {isPending ? "Sedang Mengupdate..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
