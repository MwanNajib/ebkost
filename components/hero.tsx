import Image from "next/image";
import Link from "next/link";

const Hero = () => {
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
          Booking Kamar kost sekarang
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Dapatkan penawaran spesial hanya untuk kamu hari ini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <Link
            href="/room"
            className="bg-orange-500 text-white hover:bg-orange-600 py-3 px-8 md:px-10 text-lg font-semibold rounded-lg hover:scale-105 hover:shadow-lg transition-all"
          >
            Book Now
          </Link>
          <Link
            href="/contact"
            className="bg-black/30 backdrop-blur-sm border border-orange-500 text-white hover:bg-orange-500 py-3 px-8 md:px-10 text-lg font-semibold rounded-lg hover:scale-105 hover:shadow-lg transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
