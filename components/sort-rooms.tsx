"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";

export default function SortRooms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "latest";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (value === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    
    router.push(`/?${params.toString()}#rooms`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-end max-w-7xl mx-auto px-4 mb-6">
      <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus-within:border-orange-400 transition-all">
        <IoFilterOutline className="text-gray-400" size={18} />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Urutkan:</span>
        <select 
          value={currentSort}
          onChange={handleSortChange}
          className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer pr-2"
        >
          <option value="latest">Terbaru</option>
          <option value="price_asc">Harga Terendah</option>
          <option value="price_desc">Harga Tertinggi</option>
        </select>
      </div>
    </div>
  );
}
