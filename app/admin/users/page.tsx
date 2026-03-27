import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { IoPencilOutline, IoEyeOutline } from "react-icons/io5";
import DeleteUserButton from "@/components/admin/users/delete-button";

export default async function UserListPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1a2332]">Daftar Pengguna</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-gray-100 uppercase text-xs font-bold text-gray-500 tracking-wider">
              <th className="py-4 px-4 whitespace-nowrap">Profil</th>
              <th className="py-4 px-4 whitespace-nowrap">Nama Lengkap</th>
              <th className="py-4 px-4 whitespace-nowrap">Email</th>
              <th className="py-4 px-4 whitespace-nowrap">Hak Akses</th>
              <th className="py-4 px-4 whitespace-nowrap">Tanggal Gabung</th>
              <th className="py-4 px-4 whitespace-nowrap text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  Belum ada data pengguna yang terdaftar.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="relative size-12 rounded-full overflow-hidden border border-gray-200">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User Avatar"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {user.name || "Tanpa Nama"}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.email || "-"}
                  </td>
                  <td className="py-4 px-4">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === "ADMIN" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(user.createdAt)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-4 text-gray-400">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="hover:text-green-600 transition-colors"
                        title="View User Default"
                      >
                        <IoEyeOutline className="size-5" />
                      </Link>
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="hover:text-blue-600 transition-colors"
                        title="Edit Role"
                      >
                        <IoPencilOutline className="size-5" />
                      </Link>
                      <DeleteUserButton id={user.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
