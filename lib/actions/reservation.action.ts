"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function createReservation(roomId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/signin")
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId }
  })

  if (!room) {
    throw new Error("Kamar tidak ditemukan")
  }

  // Cek apakah user sudah punya reservasi PENDING untuk kamar ini
  const existing = await prisma.reservation.findFirst({
    where: {
      userId: session.user.id,
      roomId: roomId,
      status: "PENDING"
    }
  })

  if (existing) {
    redirect(`/checkout/${existing.id}`)
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: session.user.id,
      roomId: roomId,
      totalPrice: room.price,
      status: "PENDING"
    }
  })

  redirect(`/checkout/${reservation.id}`)
}

export async function uploadPaymentProof(reservationId: string, formData: FormData) {
  try {
    const file = formData.get("proof") as File;
    if (!file || file.size === 0) {
      return { error: "Harap pilih file bukti transfer." }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const filename = `proof-${Date.now()}-${safeName}`;
    
    const uploadDir = path.join(process.cwd(), "public/uploads/proofs");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        paymentProof: `/uploads/proofs/${filename}`,
        status: "WAITING_APPROVAL"
      }
    })

    revalidatePath(`/checkout/${reservationId}`)
    revalidatePath("/my-reservation")
    return { success: "Bukti transfer berhasil diunggah. Menunggu verifikasi admin." }
  } catch (error) {
    console.error("Proof upload error:", error)
    return { error: "Gagal mengunggah bukti transfer." }
  }
}

export async function updateReservationNote(reservationId: string, note: string) {
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { notes: note }
  })
  revalidatePath(`/checkout/${reservationId}`)
}

export async function approveReservation(reservationId: string) {
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: "SUCCESS" }
  })
  revalidatePath("/admin/reservations")
}

export async function finishReservation(reservationId: string) {
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: "FINISHED" }
  })
  revalidatePath("/admin/reservations")
}
