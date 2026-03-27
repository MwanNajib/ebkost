import Image from "next/image";
import { IoCheckmarkCircle } from "react-icons/io5";

interface InvoiceViewProps {
  reservation: any;
}

export default function InvoiceView({ reservation }: InvoiceViewProps) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div id="invoice-bill" className="bg-white border-2 border-gray-100 p-6 sm:p-10 rounded-2xl relative overflow-hidden shadow-inner">
      {/* Dekorasi Watermark */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none -rotate-12 pointer-events-none">
        <h1 className="text-9xl font-black">EBKOST</h1>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-10 border-b-2 border-dashed border-gray-100 pb-8">
        <div>
          <h1 className="text-2xl font-black text-orange-500 tracking-tighter mb-1">
            EBKOST<span className="text-gray-900">PDG</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Digital Payment Receipt
          </p>
        </div>
        <div className="text-right">
          <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border border-green-200">
            <IoCheckmarkCircle size={12} />
            Transaksi Berhasil
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-medium">
            No. Invoice:{" "}
            <span className="text-gray-900 font-bold">
              #{reservation.id.slice(0, 10).toUpperCase()}
            </span>
          </p>
        </div>
      </div>

      {/* Info Buyer & Seller */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Dibayarkan Oleh:
          </p>
          <h4 className="font-black text-gray-900 text-sm leading-tight mb-0.5">
            {reservation.user.name}
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            {reservation.user.email}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Diterbitkan Oleh:
          </p>
          <h4 className="font-black text-gray-900 text-sm leading-tight mb-0.5">
            Manajemen EbKost
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            Kota Tangerang, Banten
          </p>
        </div>
      </div>

      {/* Item Table */}
      <div className="mb-10">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
          Rincian Pembayaran:
        </p>
        <div className="w-full bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="size-12 relative rounded-lg overflow-hidden shadow-sm border border-white">
                <Image
                  src={reservation.room.image}
                  alt="Room"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-xs text-left">
                  {reservation.room.name}
                </h5>
                <p className="text-[10px] text-gray-400 font-medium italic">
                  Sewa Kamar Kost - 1 Bulan
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-gray-900">
                {formatter.format(reservation.totalPrice)}
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-200 border-dashed border-t w-full my-4" />
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              Total Bayar
            </p>
            <p className="text-xl font-black text-orange-600">
              {formatter.format(reservation.totalPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Invoice */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t-2 border-gray-50 pt-8">
        <div className="text-[10px] text-gray-400 font-medium max-w-[200px] text-center sm:text-left leading-relaxed">
          <p>
            Nota ini sah diterbitkan secara elektronik dan tidak memerlukan tanda tangan basah.
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Waktu Transaksi
          </p>
          <p className="text-xs font-bold text-gray-900">
            {new Date(reservation.createdAt).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            WIB
          </p>
        </div>
      </div>

      {/* Signatures/Bottom Decoration */}
      <div className="mt-8 flex justify-center opacity-5 grayscale scale-90">
        <div className="w-24 h-24 border-8 border-gray-400 rounded-full flex items-center justify-center -rotate-12">
          <span className="font-black text-xl">LUNAS</span>
        </div>
      </div>
    </div>
  );
}
