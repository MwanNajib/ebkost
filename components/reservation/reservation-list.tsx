"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  IoCalendarOutline, 
  IoInformationCircleOutline, 
  IoReceiptOutline 
} from "react-icons/io5";
import InvoiceModal from "@/components/invoice/invoice-modal";

interface ReservationListProps {
  reservations: any[];
}

export default function ReservationList({ reservations }: ReservationListProps) {
  const [selectedRes, setSelectedRes] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format IDR inside Client Component
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleOpenInvoice = (res: any) => {
    setSelectedRes(res);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        {reservations.map((res) => (
          <div key={res.id} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex flex-col md:flex-row gap-6">
              
              <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                <Image src={res.room.image} alt={res.room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ring-1 ring-white/20 backdrop-blur-md ${
                    res.status === 'PENDING' ? 'bg-yellow-500 text-white' : 
                    res.status === 'WAITING_APPROVAL' ? 'bg-blue-500 text-white' :
                    res.status === 'SUCCESS' ? 'bg-green-500 text-white' :
                    res.status === 'CANCELLED' ? 'bg-red-500 text-white' :
                    'bg-gray-800 text-white'
                  }`}>
                    {res.status === 'PENDING' ? 'Belum Bayar' : 
                     res.status === 'WAITING_APPROVAL' ? 'Menunggu Konfirmasi' : 
                     res.status === 'SUCCESS' ? 'Sewa Aktif' : 
                     res.status === 'CANCELLED' ? 'Dibatalkan' : 'Selesai'}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{res.room.name}</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-tighter">
                      <div className="flex items-center gap-1.5"><IoCalendarOutline size={14} className="text-orange-500" /> {new Date(res.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      <div className="flex items-center gap-1.5 underline decoration-orange-300">ID: #{res.id.slice(0, 8)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Biaya</p>
                    <p className="text-xl font-black text-orange-600 tracking-tight">{formatter.format(res.totalPrice)}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {res.status === 'PENDING' ? (
                    <Link href={`/checkout/${res.id}`} className="min-w-[140px] text-center bg-gray-900 border border-gray-900 text-white py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-sm">
                      Bayar Sekarang
                    </Link>
                  ) : (
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <Link href={`/checkout/${res.id}`} className="min-w-[140px] text-center bg-white border border-gray-200 text-gray-800 py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        Detail Reservasi
                      </Link>
                      {(res.status === 'SUCCESS' || res.status === 'FINISHED') && (
                        <button 
                          onClick={() => handleOpenInvoice(res)} 
                          className="min-w-[140px] text-center bg-orange-50 border border-orange-100 text-orange-600 py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-100 transition-all flex items-center justify-center gap-2"
                        >
                          <IoReceiptOutline size={16} />
                          Unduh Struk
                        </button>
                      )}
                    </div>
                  )}
                  
                  {res.status === 'PENDING' && (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-xl text-xs font-bold ring-1 ring-yellow-100">
                      <IoInformationCircleOutline size={16} />
                      Pesanan Anda menunggu pembayaran
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InvoiceModal 
        reservation={selectedRes} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
