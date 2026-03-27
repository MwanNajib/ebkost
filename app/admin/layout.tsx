import AdminSidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <AdminSidebar />
      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 overflow-auto lg:p-4">
        {children}
      </main>
    </div>
  );
}

