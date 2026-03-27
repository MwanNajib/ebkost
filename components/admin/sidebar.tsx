"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { 
  IoHomeOutline,
  IoBedOutline, 
  IoCardOutline,
  IoPeopleOutline, 
  IoSettingsOutline, 
  IoArrowBackOutline,
  IoMenuOutline,
  IoCloseOutline
} from "react-icons/io5";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { id: 1, label: "Beranda Dashboard", href: "/admin/dashboard", icon: IoHomeOutline },
    { id: 2, label: "Kelola Kamar", href: "/admin/room", icon: IoBedOutline },
    { id: 3, label: "Data Reservasi", href: "/admin/reservations", icon: IoCardOutline },
    { id: 4, label: "Kelola Pengguna", href: "/admin/users", icon: IoPeopleOutline },
    { id: 5, label: "Pengaturan Website", href: "/admin/settings", icon: IoSettingsOutline },
  ];


  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-md shadow-sm border border-gray-100 text-orange-600 hover:bg-orange-50 focus:outline-none"
        >
          {isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
        </button>
      </div>

      {/* Desktop & Mobile Sidebar */}
      <aside 
        className={clsx(
          "fixed lg:sticky top-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-40 ease-in-out shadow-lg lg:shadow-none",
          isOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="flex items-center justify-between p-6 mb-4 h-24">
          <div className={clsx(
            "text-orange-500 font-black tracking-tighter italic transition-all duration-300 overflow-hidden whitespace-nowrap",
            isOpen ? "w-auto opacity-100 text-2xl" : "hidden lg:block lg:w-full lg:text-center lg:text-sm lg:opacity-0"
          )}>
            EBKOST ADMIN
          </div>
          {/* Logo compact form for collapsed sidebar (desktop only) */}
          <div className={clsx(
            "hidden lg:flex w-full items-center justify-center text-orange-500 font-black italic",
            isOpen ? "hidden lg:hidden" : "block text-xl"
          )}>
            EK
          </div>

          {/* Desktop Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:flex p-1 hover:bg-orange-50 rounded-md text-orange-600 ml-auto"
          >
            <IoMenuOutline size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                title={!isOpen ? item.label : undefined}
                className={clsx(
                  "flex items-center rounded-xl transition-all duration-200 overflow-hidden whitespace-nowrap",
                  isOpen ? "gap-4 px-4 py-3" : "justify-center p-3",
                  isActive 
                    ? "bg-orange-50 text-orange-600 font-bold shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={22} className="flex-shrink-0" />
                <span className={clsx(
                  "transition-all duration-300",
                  isOpen ? "opacity-100 block" : "opacity-0 hidden"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link 
            href="/" 
            title={!isOpen ? "Kembali ke Web" : undefined}
            className={clsx(
              "flex items-center rounded-xl text-gray-400 hover:text-orange-500 transition-colors font-medium whitespace-nowrap overflow-hidden",
              isOpen ? "gap-3 px-4 py-3 text-sm" : "justify-center p-3"
            )}
          >
            <IoArrowBackOutline size={20} className="flex-shrink-0" />
            <span className={clsx(
              "transition-all duration-300",
              isOpen ? "opacity-100 block" : "opacity-0 hidden"
            )}>
              Kembali ke Web
            </span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
