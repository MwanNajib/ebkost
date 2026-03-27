import { prisma } from "@/lib/prisma";
import EditForm from "@/components/admin/room/edit-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      roomAmenities: true,
    },
  });

  if (!room) {
    notFound();
  }

  const amenities = await prisma.amenities.findMany();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/room"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            title="Kembali"
          >
            <IoArrowBackOutline size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-[#1a2332]">Edit Room</h1>
        </div>
      </div>
      
      <EditForm room={room} amenities={amenities} />
    </div>
  );
}
