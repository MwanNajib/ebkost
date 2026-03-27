"use client";

import { IoPrintOutline } from "react-icons/io5";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="bg-gray-900 text-white flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
    >
      <IoPrintOutline size={20} />
      Cetak / Download PDF
    </button>
  );
}
