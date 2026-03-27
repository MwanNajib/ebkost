import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import RevenueChart from "@/components/admin/dashboard/revenue-chart";
import { 
  IoStatsChartOutline, 
  IoPeopleOutline, 
  IoBedOutline, 
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoPersonAddOutline
} from "react-icons/io5";

export default async function AdminDashboard() {
  const session = await auth();

  // Query Real Data
  const totalKamar = await prisma.room.count();
  const totalUser = await prisma.user.count();

  // Dummy Data untuk saat ini (Pemesanan & Pendapatan)
  const pemesananBaru = 12;
  const pendapatan = "Rp 12.5M";

  const stats = [
    { label: "Total Kamar", value: totalKamar, icon: <IoBedOutline size={24} />, color: "bg-blue-500", trend: "+2 Bulan Ini" },
    { label: "User Terdaftar", value: totalUser, icon: <IoPeopleOutline size={24} />, color: "bg-green-500", trend: "+5 Minggu Ini" },
    { label: "Pemesanan Baru", value: pemesananBaru, icon: <IoStatsChartOutline size={24} />, color: "bg-orange-500", trend: "Belum Diproses" },
    { label: "Estimasi Omset", value: pendapatan, icon: <IoCardOutline size={24} />, color: "bg-purple-500", trend: "Bulan Sep 2026" },
  ];

  const dummyPemesanan = [
    { id: "RES-001", user: "Budi Santoso", room: "Kamar VIP 01", status: "Selesai", date: "2 Jam Lalu" },
    { id: "RES-002", user: "Siti Aminah", room: "Kamar Reguler 05", status: "Pending", date: "5 Jam Lalu" },
    { id: "RES-003", user: "Joko Anwar", room: "Kamar AC 02", status: "Dibatalkan", date: "1 Hari Lalu" },
    { id: "RES-004", user: "Rara Lintang", room: "Kamar VIP 03", status: "Selesai", date: "2 Hari Lalu" },
    { id: "RES-005", user: "Ahmad Fauzi", room: "Kamar Reguler 01", status: "Pending", date: "2 Hari Lalu" },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1">
          Selamat datang kembali, <span className="font-semibold text-orange-600 capitalize">{session?.user?.name || "Admin"}</span>. 
          Berikut ringkasan statistik EbKost Anda hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`size-12 rounded-xl ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{item.trend}</span>
            </div>
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
            
            {/* Dekorasi Air Terjun */}
            <div className={`absolute -bottom-4 -right-4 size-24 ${item.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* Grafik Pendapatan */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Grafik Kinerja Kos (Tiruan)</h2>
            <p className="text-sm text-gray-500 mt-1">Pertumbuhan Omset dan Reservasi sepanjang 2026</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-gray-600">Pendapatan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-gray-600">Pemesanan</span>
            </div>
          </div>
        </div>
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tabel Pemesanan Terbaru (Dummy) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pemesanan Terkini</h2>
            <button className="text-sm font-semibold text-orange-600 hover:text-orange-700">Lihat Semua</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100 uppercase text-xs font-bold text-gray-400">
                  <th className="py-3 px-2">ID Reservasi</th>
                  <th className="py-3 px-2">Penyewa</th>
                  <th className="py-3 px-2">Kamar</th>
                  <th className="py-3 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dummyPemesanan.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-2 font-medium text-gray-900 text-sm">{res.id}</td>
                    <td className="py-4 px-2 text-gray-700 font-semibold text-sm">
                      {res.user}
                      <span className="block text-[10px] text-gray-400 font-normal mt-0.5">{res.date}</span>
                    </td>
                    <td className="py-4 px-2 text-gray-600 text-sm">{res.room}</td>
                    <td className="py-4 px-2 text-center">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        res.status === "Selesai" ? "bg-green-100 text-green-700" :
                        res.status === "Pending" ? "bg-orange-100 text-orange-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Logs Aktivitas (Dummy) */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">Aktivitas Terkini</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start relative before:absolute before:left-[15px] before:top-8 before:bottom-[-24px] before:w-0.5 before:bg-gray-100">
              <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm z-10">
                 <IoPersonAddOutline size={16} />
              </div>
              <div className="pt-1">
                <p className="text-sm font-bold text-gray-900">User baru mendaftar</p>
                <p className="text-xs text-gray-500 mt-1">Budi Santoso bergabung menggunakan Google</p>
                <p className="text-[10px] text-gray-400 mt-2 font-semibold">10 menit yang lalu</p>
              </div>
            </div>

            <div className="flex gap-4 items-start relative before:absolute before:left-[15px] before:top-8 before:bottom-[-24px] before:w-0.5 before:bg-gray-100">
              <div className="size-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-sm z-10">
                 <IoBedOutline size={16} />
              </div>
              <div className="pt-1">
                <p className="text-sm font-bold text-gray-900">Kamar baru ditambahkan</p>
                <p className="text-xs text-gray-500 mt-1">Admin menambahkan Kamar VIP 04 (Rp 2.500.000)</p>
                <p className="text-[10px] text-gray-400 mt-2 font-semibold">1 Jam yang lalu</p>
              </div>
            </div>

            <div className="flex gap-4 items-start relative">
              <div className="size-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm z-10">
                 <IoCheckmarkCircleOutline size={18} />
              </div>
              <div className="pt-1">
                <p className="text-sm font-bold text-gray-900">Pembayaran Sukses</p>
                <p className="text-xs text-gray-500 mt-1">Siti Aminah melunasi tagihan RES-002</p>
                <p className="text-[10px] text-gray-400 mt-2 font-semibold">2 Hari yang lalu</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

