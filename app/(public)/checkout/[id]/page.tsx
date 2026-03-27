import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import CheckoutClient from "./checkout-client";
import { IoShieldCheckmarkOutline, IoTimeOutline, IoWalletOutline, IoCheckmarkCircle } from "react-icons/io5";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/signin");

  const resolvedParams = await params;
  const id = resolvedParams.id;

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: {
      room: true,
      user: true,
    },
  });

  if (!reservation || reservation.userId !== session.user?.id) {
    notFound();
  }

  // Format IDR
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 pt-10 mt-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header & Stepper */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Penyelesaian Reservasi</h1>
          
          <div className="flex items-center justify-center max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            
            <div className="flex justify-between w-full relative z-10 px-2">
              <div className="flex flex-col items-center gap-2">
                <div className={`size-10 ${reservation.status !== 'PENDING' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'} rounded-full flex items-center justify-center font-bold shadow-lg ring-4 ring-white`}>
                   {reservation.status !== 'PENDING' ? <IoCheckmarkCircle size={24} /> : '1'}
                </div>
                <span className="text-xs font-bold text-gray-900">Rincian</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <div className={`size-10 ${
                  reservation.status === 'SUCCESS' || reservation.status === 'FINISHED' ? 'bg-green-500 text-white' : 
                  reservation.status === 'PENDING' ? 'bg-white border-2 border-gray-200' : 'bg-orange-500 text-white'
                } rounded-full flex items-center justify-center font-bold ring-4 ring-white`}>
                   {reservation.status === 'SUCCESS' || reservation.status === 'FINISHED' ? <IoCheckmarkCircle size={24} /> : '2'}
                </div>
                <span className={`text-xs font-bold ${reservation.status !== 'PENDING' ? 'text-gray-900' : ''}`}>Pembayaran</span>
              </div>

              <div className="flex flex-col items-center gap-2 text-gray-400">
                <div className={`size-10 ${reservation.status === 'SUCCESS' || reservation.status === 'FINISHED' ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-white border-2 border-gray-200'} rounded-full flex items-center justify-center font-bold ring-4 ring-white transition-all`}>3</div>
                <span className={`text-xs font-bold ${reservation.status === 'SUCCESS' || reservation.status === 'FINISHED' ? 'text-green-600 font-black scale-110' : ''}`}>Selesai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Rincian Kamar & User */}
          <div className="lg:col-span-12">
             <CheckoutClient 
                reservation={reservation} 
                formattedPrice={formatter.format(reservation.totalPrice)} 
             />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 text-gray-500">
              <IoShieldCheckmarkOutline size={20} />
              <span className="text-sm font-semibold">Secure Payment</span>
           </div>
           <div className="flex items-center gap-2 text-gray-500">
              <IoTimeOutline size={20} />
              <span className="text-sm font-semibold">SLA Verifikasi Cepat</span>
           </div>
           <div className="flex items-center gap-2 text-gray-500">
              <IoWalletOutline size={20} />
              <span className="text-sm font-semibold">Multiple Methods</span>
           </div>
        </div>

      </div>
    </div>
  );
}
