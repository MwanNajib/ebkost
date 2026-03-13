import Link from "next/link";
import { IoGridOutline, IoBedOutline, IoPeopleOutline, IoSettingsOutline, IoArrowBackOutline } from "react-icons/io5";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-gray-100 p-6 sticky top-0 h-screen">
        <div className="mb-10 px-2 mt-4 text-orange-500 font-black text-2xl tracking-tighter italic">
          EBKOST ADMIN
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold shadow-sm">
            <IoGridOutline size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/room" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <IoBedOutline size={20} />
            <span>Manage Room</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <IoPeopleOutline size={20} />
            <span>Manage Users</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <IoSettingsOutline size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
            <IoArrowBackOutline size={18} />
            <span>Kembali ke Web</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
