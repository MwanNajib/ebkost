import Card from "@/components/card";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function Main({ sort }: { sort?: string }) {
  const session = await auth();
  
  // Menentukan kriteria pengurutan Prisma
  let orderBy: any = { createdAt: "desc" };
  
  if (sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { price: "desc" };
  }

  const rooms = await prisma.room.findMany({
    orderBy,
    take: 12,
    include: {
      roomAmenities: {
        include: {
          amenities: true
        }
      }
    }
  });

  return (
    <div className="max-w-7xl py-6 pb-20 px-4 mx-auto">
      {rooms.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Belum ada kamar yang tersedia saat ini.</p>
        </div>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card 
              key={room.id} 
              room={room} 
              isLoggedIn={!!session} 
            />
          ))}
        </div>
      )}
    </div>
  );
}


