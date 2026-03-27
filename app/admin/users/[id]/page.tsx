import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackOutline, IoMailOutline, IoCalendarOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

export default async function ViewUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto pb-10">
      {/* Header and Back Link */}
      <div className="flex items-center justify-between mb-8 mt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            title="Kembali"
          >
            <IoArrowBackOutline size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-[#1a2332]">User Details</h1>
        </div>
        <Link
          href={`/admin/users/${user.id}/edit`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md font-semibold transition-colors shadow-sm text-sm"
        >
          Change Role
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar/Avatar Area */}
        <div className="bg-orange-50 w-full md:w-1/3 flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-orange-100">
          <div className="relative size-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-orange-200 flex items-center justify-center text-4xl text-orange-600 font-bold">
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name || "Default Avatar"} 
                fill 
                className="object-cover"
              />
            ) : (
                user.name?.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 text-center">{user.name || "Tanpa Nama"}</h2>
          <div className={`mt-2 px-4 py-1.5 rounded-full text-xs font-bold ${
            user.role === "ADMIN" 
              ? "bg-purple-100 text-purple-700" 
              : "bg-white border border-gray-200 text-gray-600"
          }`}>
            {user.role}
          </div>
        </div>

        {/* Info Content Area */}
        <div className="w-full md:w-2/3 p-8 sm:p-10 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
              <div className="flex items-center gap-3 text-gray-800 font-medium text-lg">
                <IoMailOutline className="text-orange-500 size-6" />
                {user.email || "-"}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Kredensial Akses</p>
              <div className="flex items-center gap-3 text-gray-800 font-medium">
                <IoShieldCheckmarkOutline className="text-green-500 size-6 text-xl" />
                <span>Login Menggunakan <span className="font-bold">Google Auth</span></span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Terdaftar Pada</p>
              <div className="flex items-center gap-3 text-gray-800 font-medium">
                <IoCalendarOutline className="text-blue-500 size-6 text-xl" />
                {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "full",
                  timeStyle: "short"
                }).format(user.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
