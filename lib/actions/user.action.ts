"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateUserRole(id: string, prevState: any, formData: FormData) {
  try {
    const role = formData.get("role") as "ADMIN" | "USER"
    
    // Validasi sederhana
    if (!role || (role !== "ADMIN" && role !== "USER")) {
      return { error: "Role tidak valid." }
    }

    // Pastikan user ada
    const existingUser = await prisma.user.findUnique({ where: { id } })
    if (!existingUser) throw new Error("Pengguna tidak ditemukan")

    // Update ke database
    await prisma.user.update({
      where: { id },
      data: {
        role,
      },
    })
  } catch (error) {
    console.error("Error updating user role:", error)
    return { error: "Terjadi kesalahan saat mengubah role pengguna." }
  }

  revalidatePath("/admin/users")
  redirect("/admin/users")
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { success: false, error: "Gagal menghapus pengguna." }
  }
}
