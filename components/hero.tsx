import Image from "next/image";
import Link from "next/link";

const Hero = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="hero image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-3 capitalize">
          Hunian Nyaman, Harga Berteman.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
          Temukan kamar kost impian Anda dengan fasilitas lengkap dan lokasi strategis. Booking sekarang dan dapatkan harga spesial khusus hari ini!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <Link
            href={isLoggedIn ? "/#rooms" : "/signin?callbackUrl=/#rooms"}
            className="bg-orange-500 text-white hover:bg-orange-600 py-3.5 px-10 text-lg font-bold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-orange-200 transition-all"
          >
            Pesan Sekarang
          </Link>
          <Link
            href="/#contact"
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-orange-600 py-3.5 px-10 text-lg font-bold rounded-xl hover:scale-105 hover:shadow-xl transition-all"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>

    </div>
  );
};


export default Hero;
