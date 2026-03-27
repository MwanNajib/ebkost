"use server"

import { snap } from "@/lib/midtrans"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function getSnapToken(reservationId: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: {
      room: true,
      user: true
    }
  })

  if (!reservation) throw new Error("Reservation not found")

  // Jika snapToken sudah ada, kembalikan itu
  if (reservation.snapToken) {
    return reservation.snapToken
  }

  const parameter = {
    transaction_details: {
      order_id: reservation.id,
      gross_amount: reservation.totalPrice,
    },
    customer_details: {
      first_name: reservation.user.name || "Guest",
      email: reservation.user.email,
    },
    item_details: [
      {
        id: reservation.room.id,
        price: reservation.room.price,
        quantity: 1,
        name: reservation.room.name,
      },
    ],
  };

  const transaction = await snap.createTransaction(parameter);
  
  // Simpan snapToken di DB
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { snapToken: transaction.token }
  })

  return transaction.token
}

export async function checkPaymentStatus(reservationId: string) {
  try {
    const statusResponse = await snap.transaction.status(reservationId);
    
    // Status can be: 'settlement' (Success), 'pending', 'expire', 'deny', etc.
    if (statusResponse.transaction_status === 'settlement' || statusResponse.transaction_status === 'capture') {
       await prisma.reservation.update({
          where: { id: reservationId },
          data: { status: "SUCCESS" }
       });
       return { status: "SUCCESS" };
    }
    
    return { status: statusResponse.transaction_status };
  } catch (error) {
    console.error("Check Status Error:", error);
    return { error: "Gagal mengecek status pembayaran." };
  }
}
