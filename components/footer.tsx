import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div>
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo.png"
                width={128}
                height={49}
                alt="logo"
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base mt-2">
              Platform booking kost terbaik dan terpercaya. Temukan hunian
              nyaman, aman, dan strategis dengan harga yang terjangkau.
            </p>
          </div>

          {/* Links */}
          <div className="lg:ml-8">
            <h4 className="mb-6 text-xl font-semibold text-white">Link</h4>
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/room"
                  className="hover:text-blue-400 transition-colors"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">Legal</h4>
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Legal
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Term &amp; Condition
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Payment Method
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-5 text-sm md:text-base leading-relaxed">
              Dapatkan informasi dan penawaran kos terbaru dari kami.
            </p>
            <form action="" className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-800 py-8 text-center text-sm md:text-base text-gray-500">
        &copy; Copyright 2026 | MWAN | All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
