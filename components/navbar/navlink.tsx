"use client";
import { useState } from "react";
import { IoMenu, IoClose, IoLogOutOutline, IoGridOutline, IoPersonOutline } from "react-icons/io5";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface NavLinkProps {
  session: Session | null;
}

const NavLink = ({ session }: NavLinkProps) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 transition-colors"
        >
          {open ? <IoClose className="size-8 text-orange-500" /> : <IoMenu className="size-8" />}
        </button>

        <div
          className={clsx("w-full md:block md:w-auto", {
            "absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-xl md:static md:bg-transparent md:border-0 md:p-0 md:shadow-none": open,
            "hidden": !open,
          })}
        >
          <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-white animate-in slide-in-from-top-2 duration-200">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-800 hover:text-orange-500 rounded-sm md:hover:bg-transparent md:p-0 transition-colors"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="block py-2 px-3 text-gray-800 hover:text-orange-500 rounded-sm md:hover:bg-transparent md:p-0 transition-colors"
              >
                Tentang Kami
              </Link>
            </li>

            {/* Kamar Kost — hanya untuk tamu & user biasa, admin tidak perlu karena ada di dashboard */}
            {!isAdmin && (
              <li>
                <Link
                  href="/#rooms"
                  className="block py-2 px-3 text-gray-800 hover:text-orange-500 rounded-sm md:hover:bg-transparent md:p-0 transition-colors"
                >
                  Kamar Kost
                </Link>
              </li>
            )}

            <li>
              <Link
                href="/#contact"
                className="block py-2 px-3 text-gray-800 hover:text-orange-500 rounded-sm md:hover:bg-transparent md:p-0 transition-colors"
              >
                Hubungi Kami
              </Link>
            </li>


            {session && !isAdmin && (
              <li>
                <Link
                  href="/my-reservation"
                  className="block py-2 px-3 text-gray-800 hover:text-orange-500 rounded-sm md:hover:bg-transparent md:p-0 transition-colors"
                >
                  Pesanan Saya
                </Link>
              </li>
            )}

            {/* Menu Khusus Admin di Bar Utama */}
            {isAdmin && (
              <li>
                <Link
                  href="/admin/dashboard"
                  className="block py-2 px-3 text-orange-600 font-bold hover:text-orange-700 rounded-sm md:hover:bg-transparent md:p-0 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!session && (
              <li className="pt-2 md:pt-0">
                <Link
                  href="/signin"
                  className="inline-block py-2.5 px-6 bg-orange-400 text-white font-bold hover:bg-orange-500 rounded-lg shadow-md shadow-orange-200 transition-all active:scale-95"
                >
                  Masuk Akun
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Profile Dropdown / User Info */}
        {session && (
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 pl-3 bg-gray-50 hover:bg-orange-50 border border-gray-100 rounded-full transition-all duration-200"
            >
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[100px]">
                  {session.user?.name || "User"}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {isAdmin ? "Administrator" : "Member Akun"}
                </p>
              </div>
              <div className="size-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="User" width={36} height={36} />
                ) : (
                  <div className="size-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                    {session.user?.name?.charAt(0) || <IoPersonOutline size={18} />}
                  </div>
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div 
                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 z-50"
                onMouseLeave={() => setProfileOpen(false)}
              >
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-sm font-bold text-gray-900 truncate">{session.user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                </div>
                
                {isAdmin && (
                  <Link 
                    href="/admin/dashboard" 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <IoGridOutline size={18} />
                    <span>Panel Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <IoLogOutOutline size={18} />
                  <span>Keluar Akun</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NavLink;
