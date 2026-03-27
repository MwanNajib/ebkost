"use client";

import { useActionState } from "react";
import { updateUserRole } from "@/lib/actions/user.action";

interface EditUserFormProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: "ADMIN" | "USER";
  };
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const updateUserRoleWithId = updateUserRole.bind(null, user.id);
  const [state, formAction, isPending] = useActionState(updateUserRoleWithId, null);

  return (
    <form action={formAction} className="mt-6 flex flex-col md:flex-row gap-8 max-w-2xl bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex-1 space-y-6">
        
        <div>
          <p className="text-gray-400 text-sm font-semibold mb-2">Nama Pengguna</p>
          <div className="text-gray-900 font-bold bg-gray-50 p-3 rounded-lg border border-gray-100">
            {user.name || "Tanpa Nama"}
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm font-semibold mb-2">Alamat Email</p>
          <div className="text-gray-900 font-bold bg-gray-50 p-3 rounded-lg border border-gray-100">
            {user.email || "-"}
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-3">Pilih Hak Akses (Role)</label>
          <select
            id="role"
            name="role"
            defaultValue={user.role}
            className="w-full border border-gray-200 rounded text-sm px-4 py-3 outline-none focus:border-orange-400 focus:bg-white text-gray-700 bg-white cursor-pointer"
          >
            <option value="USER">USER (Member Biasa)</option>
            <option value="ADMIN">ADMIN (Administrator Kos)</option>
          </select>
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm mt-2">{state.error}</div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#f08519] hover:bg-[#d67212] text-white font-bold py-3 px-4 rounded transition-colors shadow-sm disabled:opacity-50 mt-4"
        >
          {isPending ? "Menyimpan Perubahan..." : "Update Role Pengguna"}
        </button>
      </div>
    </form>
  );
}
