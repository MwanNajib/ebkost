import { prisma } from "@/lib/prisma";
import CreateForm from "@/components/admin/room/create-form";

export const dynamic = 'force-dynamic';

export default async function CreateRoomPage() {
  // Check and seed Amenities if empty or if it needs reset (Kost context)
  let amenities = await prisma.amenities.findMany();
  
  const seedAmenities = [
    "Listrik Gratis", "WiFi Cepat", "AC", "Kipas Angin", 
    "Kamar Mandi Dalam", "Kasur Springbed", "Lemari Pakaian", "Meja Belajar", 
    "Dapur Bersama", "Akses Kunci 24 Jam"
  ];

  // Simple auto-update logic: If the first item doesn't match Kost context, reset it.
  if (amenities.length === 0 || !seedAmenities.includes(amenities[0].name)) {
    await prisma.amenities.deleteMany(); // Reset amenities
    await prisma.amenities.createMany({
      data: seedAmenities.map(name => ({ name }))
    });
    amenities = await prisma.amenities.findMany();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1a2332] mb-8 mt-2">Create New Room</h1>
      <CreateForm amenities={amenities} />
    </div>
  );
}
