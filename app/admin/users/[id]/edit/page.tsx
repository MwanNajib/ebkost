import { prisma } from "@/lib/prisma";
import EditUserForm from "@/components/admin/users/edit-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default async function EditUserPage({
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
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            title="Kembali"
          >
            <IoArrowBackOutline size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-[#1a2332]">Change User Role</h1>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 max-w-2xl">
        Ubah hak akses pengguna antara <strong>USER</strong> (Member standar yang dapat mengakses reservasi) atau <strong>ADMIN</strong> (Administrator penuh yang bisa mengelola seluruh halaman ini).
      </p>

      <EditUserForm 
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }} 
      />
    </div>
  );
}
