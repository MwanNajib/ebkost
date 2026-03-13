import { auth } from "@/auth";
import { IoStatsChartOutline, IoPeopleOutline, IoBedOutline, IoCardOutline } from "react-icons/io5";

export default async function AdminDashboard() {
  const session = await auth();

  const stats = [
    { label: "Total Kamar", value: "24", icon: <IoBedOutline size={24} />, color: "bg-blue-500" },
    { label: "User Aktif", value: "156", icon: <IoPeopleOutline size={24} />, color: "bg-green-500" },
    { label: "Pemesanan Baru", value: "8", icon: <IoStatsChartOutline size={24} />, color: "bg-orange-500" },
    { label: "Pendapatan", value: "Rp 12.5M", icon: <IoCardOutline size={24} />, color: "bg-purple-500" },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1">
          Selamat datang kembali, <span className="font-semibold text-orange-600">{session?.user?.name}</span>. 
          Berikut ringkasan statistik EbKost hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`size-12 rounded-xl ${item.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
              {item.icon}
            </div>
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Content Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Pemesanan Terbaru</h2>
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="italic text-sm text-center">Data pemesanan akan tampil di sini...</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Logs Aktivitas</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="size-8 rounded-full bg-gray-100 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">User baru mendaftar</p>
                  <p className="text-xs text-gray-500 mt-1">2 menit yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
