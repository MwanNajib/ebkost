import Link from "next/link";
import Image from "next/image";
import {
  IoLogoWhatsapp,
  IoMailOutline,
  IoLocationOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo.png"
                width={128}
                height={49}
                alt="logo"
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm mt-2">
              Platform booking kost terbaik dan terpercaya. Temukan hunian
              nyaman, aman, dan strategis dengan harga yang terjangkau.
            </p>
          </div>

          {/* Navigasi */}
          <div className="lg:ml-8">
            <h4 className="mb-6 text-base font-bold text-white uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 hover:text-orange-400 transition-colors group"
                >
                  <IoChevronForwardOutline
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="flex items-center gap-1.5 hover:text-orange-400 transition-colors group"
                >
                  <IoChevronForwardOutline
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  Tentang Kami
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  className="flex items-center gap-1.5 hover:text-orange-400 transition-colors group"
                >
                  <IoChevronForwardOutline
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-6 text-base font-bold text-white uppercase tracking-wider">
              Kontak
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a
                  href="mailto:admin@ebkost.com"
                  className="flex items-start gap-3 hover:text-orange-400 transition-colors group"
                >
                  <IoMailOutline
                    size={18}
                    className="mt-0.5 shrink-0 group-hover:text-orange-400"
                  />
                  <span>admin@ebkost.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-orange-400 transition-colors group"
                >
                  <IoLogoWhatsapp
                    size={18}
                    className="mt-0.5 shrink-0 group-hover:text-orange-400"
                  />
                  <span>+62 812 3456 7890</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <IoLocationOutline size={18} className="mt-0.5 shrink-0" />
                  <span className="leading-relaxed">
                    Jl. Ir. H. Juanda No. 1, Karanganyar, Neglasari,
                    <br />
                    Kota Tangerang, Banten
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="mb-6 text-base font-bold text-white uppercase tracking-wider">
              Jam Operasional
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-gray-400">
                <span>Senin – Jumat</span>
                <span className="text-white font-semibold">08.00 – 17.00</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sabtu</span>
                <span className="text-white font-semibold">08.00 – 15.00</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Minggu</span>
                <span className="text-red-400 font-semibold">Tutup</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-orange-400 text-xs leading-relaxed font-medium">
                Untuk pertanyaan darurat di luar jam operasional, silakan
                hubungi via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-800 py-8 text-center text-sm md:text-base text-gray-500">
        &copy; Copyright 2026 | MWAN | All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
