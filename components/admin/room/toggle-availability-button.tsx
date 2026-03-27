"use client";

import { useState, useTransition } from "react";
import { toggleRoomAvailability } from "@/lib/actions/room.action";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

interface ToggleAvailabilityButtonProps {
  id: string;
  isAvailable: boolean;
}

export default function ToggleAvailabilityButton({ id, isAvailable }: ToggleAvailabilityButtonProps) {
  const [available, setAvailable] = useState(isAvailable);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newValue = !available;
    setAvailable(newValue); // optimistic update

    startTransition(async () => {
      const result = await toggleRoomAvailability(id, newValue);
      if (!result.success) {
        setAvailable(!newValue); // revert on error
        alert("Gagal mengubah status kamar. Coba lagi.");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={available ? "Klik untuk tandai Sold Out" : "Klik untuk tandai Tersedia"}
      className={`
        relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border
        ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}
        ${available
          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
        }
      `}
    >
      {available ? (
        <IoCheckmarkCircle size={14} className="shrink-0" />
      ) : (
        <IoCloseCircle size={14} className="shrink-0" />
      )}
      <span className="whitespace-nowrap">
        {isPending ? "Menyimpan..." : available ? "Tersedia" : "Sold Out"}
      </span>

      {/* Animated indicator */}
      {available && !isPending && (
        <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-green-500 rounded-full animate-pulse" />
      )}
    </button>
  );
}
