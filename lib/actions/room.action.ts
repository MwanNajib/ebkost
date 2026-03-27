"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function createRoom(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const capacity = parseInt(formData.get("capacity") as string, 10)
    const price = parseInt(formData.get("price") as string, 10)
    const file = formData.get("image") as File | null;
    
    let imageUrl = "/placeholder-room.jpg";

    if (file && typeof file !== 'string' && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
      const filename = `${Date.now()}-${safeName}`;
      
      try {
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
      } catch (err) {
        console.error("Failed to write file", err);
      }
    }
    
    const amenities = formData.getAll("amenities") as string[]

    if (!name || !description || isNaN(capacity) || isNaN(price)) {
      return { error: "Harap isi semua kolom wajib dengan benar." }
    }

    await prisma.room.create({
      data: {
        name,
        description,
        capacity,
        price,
        image: imageUrl,
        isAvailable: true,
        roomAmenities: {
          create: amenities.map((amenityId) => ({
            amenities: {
              connect: { id: amenityId }
            }
          }))
        }
      },
    })

  } catch (error) {
    console.error("Error creating room:", error)
    return { error: "Terjadi kesalahan saat menyimpan data kamar." }
  }

  revalidatePath("/admin/room")
  redirect("/admin/room")
}

export async function updateRoom(id: string, prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const capacity = parseInt(formData.get("capacity") as string, 10)
    const price = parseInt(formData.get("price") as string, 10)
    const file = formData.get("image") as File | null;
    
    const existingRoom = await prisma.room.findUnique({ where: { id } })
    if (!existingRoom) throw new Error("Kamar tidak ditemukan")

    let imageUrl = existingRoom.image;

    if (file && typeof file !== 'string' && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
      const filename = `${Date.now()}-${safeName}`;
      
      try {
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
      } catch (err) {
        console.error("Failed to write updated file", err);
      }
    }
    
    const amenities = formData.getAll("amenities") as string[]

    if (!name || !description || isNaN(capacity) || isNaN(price)) {
      return { error: "Harap isi semua kolom wajib dengan benar." }
    }

    await prisma.room.update({
      where: { id },
      data: {
        name,
        description,
        capacity,
        price,
        image: imageUrl,
        roomAmenities: {
          deleteMany: {},
          create: amenities.map((amenityId) => ({
            amenities: {
              connect: { id: amenityId }
            }
          }))
        }
      },
    })
  } catch (error) {
    console.error("Error updating room:", error)
    return { error: "Terjadi kesalahan saat mengubah data kamar." }
  }

  revalidatePath("/admin/room")
  redirect("/admin/room")
}

export async function deleteRoom(id: string) {
  try {
    await prisma.room.delete({
      where: { id }
    })
    revalidatePath("/admin/room")
    return { success: true }
  } catch (error) {
    console.error("Error deleting room:", error)
    return { success: false, error: "Gagal menghapus kamar." }
  }
}

// ── NEW: Toggle ketersediaan kamar (admin only) ──────────────────────────────
export async function toggleRoomAvailability(id: string, isAvailable: boolean) {
  try {
    await prisma.room.update({
      where: { id },
      data: { isAvailable },
    })
    revalidatePath("/admin/room")
    revalidatePath("/")
    revalidatePath(`/rooms/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Error toggling room availability:", error)
    return { success: false, error: "Gagal mengubah status kamar." }
  }
}
