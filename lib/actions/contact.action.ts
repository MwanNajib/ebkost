"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitContact(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
      return { error: "Semua kolom harus diisi." }
    }

    // Save to database
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    revalidatePath("/contact")
    return { success: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda." }
  } catch (error) {
    console.error("Error submitting contact:", error)
    return { error: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti." }
  }
}
