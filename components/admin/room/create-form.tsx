"use client";

import { useActionState } from "react";
import { createRoom } from "@/lib/actions/room.action";
import { IoCloudUploadOutline } from "react-icons/io5";

interface CreateFormProps {
  amenities: {
    id: string;
    name: string;
  }[];
}

export default function CreateForm({ amenities }: CreateFormProps) {
  const [state, formAction, isPending] = useActionState(createRoom, null);

  return (
    <form action={formAction} className="mt-6 flex flex-col md:flex-row gap-8">
      {/* Left Column */}
      <div className="flex-1 space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Room Name..."
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <textarea
            name="description"
            rows={8}
            placeholder="Description..."
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400 resize-none"
          ></textarea>
        </div>

        <div>
          <p className="text-gray-700 text-sm font-semibold mb-3">Amenities</p>
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
        <label className="border-2 border-dashed border-gray-200 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors h-48 relative overflow-hidden group">
          <IoCloudUploadOutline className="size-8 text-gray-400 mb-2 group-hover:text-orange-500 transition-colors" />
          <p className="text-sm font-semibold text-gray-700">Select Image</p>
          <p className="text-[11px] text-gray-400 mt-1 px-4">
            SVG, PNG, JPG, GIF, or Others (Max 4MB)
          </p>
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
                e.currentTarget.parentElement!.style.backgroundSize = 'cover';
                e.currentTarget.parentElement!.style.backgroundPosition = 'center';
                // Menyembunyikan teks di label jika gambar terpilih untuk estetika
                Array.from(e.currentTarget.parentElement!.children).forEach(child => {
                  if (child.tagName !== 'INPUT') (child as HTMLElement).style.opacity = '0';
                });
              }
            }}
          />
        </label>

        <div>
          <input
            type="number"
            name="capacity"
            placeholder="Capacity..."
            min={1}
            required
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="number"
            name="price"
            placeholder="Price..."
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
          className="w-full bg-[#f08519] hover:bg-[#d67212] text-white font-bold py-3 px-4 rounded transition-colors shadow-sm disabled:opacity-50 mt-auto"
        >
          {isPending ? "Menyimpan..." : "Save"}
        </button>
      </div>
    </form>
  );
}
