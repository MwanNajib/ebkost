import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { IoCheckmarkCircle } from "react-icons/io5";
import PrintButton from "@/components/invoice/print-button";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/signin");

  const { id } = await params;

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: { room: true, user: true },
  });

  if (!reservation || reservation.userId !== session.user?.id)
    return notFound();

  // Redirect if not paid
  if (reservation.status === "PENDING" || reservation.status === "CANCELLED") {
    redirect(`/checkout/${reservation.id}`);
  }

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-white min-h-screen p-4 sm:p-10 font-sans text-gray-900">
      {/* Container Struk */}
      <div
        id="invoice-bill"
        className="max-w-2xl mx-auto border-2 border-gray-100 p-8 sm:p-12 rounded-lg relative overflow-hidden"
      >
        {/* Dekorasi Watermark */}
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none -rotate-12 pointer-events-none">
          <h1 className="text-9xl font-black">EBKOST</h1>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-12 border-b-2 border-dashed border-gray-100 pb-8">
          <div>
            <h1 className="text-3xl font-black text-orange-500 tracking-tighter mb-1">
              EBKOST<span className="text-gray-900">PDG</span>
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Digital Payment Receipt
            </p>
          </div>
          <div className="text-right">
            <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border border-green-200">
              <IoCheckmarkCircle size={14} />
              Transaksi Berhasil
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              No. Invoice:{" "}
              <span className="text-gray-900 font-bold">
                #{reservation.id.slice(0, 10).toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* Info Buyer & Seller */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              Dibayarkan Oleh:
            </p>
            <h4 className="font-black text-gray-900 leading-tight mb-1">
              {reservation.user.name}
            </h4>
            <p className="text-sm text-gray-500 font-medium">
              {reservation.user.email}
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              Diterbitkan Oleh:
            </p>
            <h4 className="font-black text-gray-900 leading-tight mb-1">
              Manajemen EbKost
            </h4>
            <p className="text-sm text-gray-500 font-medium">
              Kota Tangerang, Banten
            </p>
          </div>
        </div>

        {/* Item Table */}
        <div className="mb-12">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
            Rincian Pembayaran:
          </p>
          <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <div className="size-14 relative rounded-xl overflow-hidden shadow-sm border border-white">
                  <Image
                    src={reservation.room.image}
                    alt="Room"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">
                    {reservation.room.name}
                  </h5>
                  <p className="text-xs text-gray-400 font-medium italic">
                    Sewa Kamar Kost - 1 Bulan
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-gray-900">
                  {formatter.format(reservation.totalPrice)}
                </p>
              </div>
            </div>
            <div className="h-px bg-gray-200 border-dashed border-t w-full my-4" />
            <div className="flex justify-between items-center">
              <p className="text-sm font-black text-gray-400 uppercase">
                Total Bayar
              </p>
              <p className="text-2xl font-black text-orange-600">
                {formatter.format(reservation.totalPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Invoice */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t-2 border-gray-50 pt-8 mt-12">
          <div className="text-xs text-gray-400 font-medium max-w-xs text-center md:text-left">
            <p>
              Terima kasih telah menggunakan EbKost. Nota ini sah diterbitkan
              secara elektronik dan tidak memerlukan tanda tangan basah.
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Waktu Transaksi
            </p>
            <p className="text-sm font-bold text-gray-900">
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
        <div className="mt-12 flex justify-center opacity-10 grayscale scale-125">
          <div className="w-32 h-32 border-8 border-gray-400 rounded-full flex items-center justify-center -rotate-12">
            <span className="font-black text-2xl">LUNAS</span>
          </div>
        </div>
      </div>

      {/* Control Buttons (Hidden on Print) */}
      <div className="max-w-2xl mx-auto mt-10 mb-20 flex gap-4 print:hidden">
        <PrintButton />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body { background: white !important; padding: 0 !important; }
          .print\\:hidden { display: none !important; }
          #invoice-bill { border: none !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
        }
      `,
        }}
      />
    </div>
  );
}
