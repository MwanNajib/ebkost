import Link from "next/link";
import Image from "next/image";
import NavLink from "./navlink";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-0 w-full bg-white z-20 border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
          <Image src="/logo.png" alt="Logo" width={100} height={40} priority className="h-auto w-auto" />
        </Link>
        <NavLink session={session} />
      </div>
    </div>
  );
};

export default Navbar;
