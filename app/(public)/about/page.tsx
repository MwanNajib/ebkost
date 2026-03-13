import type { Metadata } from "next";
import Image from "next/image";
import {
  IoEyeOutline,
  IoLocateOutline,
  IoShieldCheckmarkOutline,
  IoHeartOutline,
} from "react-icons/io5";
import HeaderSection from "@/components/header-section";

export const metadata: Metadata = {
  title: "About Us | Ebokingkost",
  description: "Who We Are",
};

const AboutPage = () => {
  return (
    <div className="bg-gray-50/50 pb-20">
      <HeaderSection
        title="Tentang Kami"
        subTitle="Kenali lebih dekat platform booking kos terpercaya Anda."
      />

      <div className="max-w-screen-xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Bagian Kiri: Gambar dengan Aksen Modern */}
          <div className="relative group perspective">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/10 ring-1 ring-gray-900/5 bg-white">
              <Image
                src="/about.jpg"
                width={800}
                height={700}
                alt="Tentang Ebokingkost"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                priority
              />
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-orange-100 text-orange-600">
                    <IoShieldCheckmarkOutline size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      Terverifikasi 100%
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Hanya kos berkualitas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Konten Teks */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold tracking-wide uppercase mb-6 w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              Cerita Kami
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-6 tracking-tight">
              Lebih Dari Sekadar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Pencari Kos Biasa
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Kami adalah platform pencarian dan pemesanan kos modern yang
              berdedikasi untuk memberikan pengalaman mencari hunian yang aman,
              nyaman, dan praktis. Dengan ribuan pilihan kos terverifikasi, kami
              hadir untuk menjadi penghubung paling dipercaya antara pencari
              hunian dan pemilik properti di seluruh Nusantara.
            </p>

            <div className="space-y-8">
              {/* Vision Card */}
              <div className="group flex gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex-none mt-1">
                  <div className="flex items-center justify-center size-14 rounded-2xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <IoEyeOutline size={28} />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Visi Kami
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Menjadi platform pencarian hunian kos nomor satu yang paling
                    dipercaya dan diandalkan kemudahannya oleh seluruh pelajar,
                    mahasiswa, dan pekerja di Indonesia.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="group flex gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex-none mt-1">
                  <div className="flex items-center justify-center size-14 rounded-2xl bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <IoLocateOutline size={28} />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Misi Utama
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Memberikan informasi kos yang akurat, transparan, serta
                    menyediakan kemudahan transaksi bagi pencari kos dan
                    membantu pemilik mengelola properti mereka secara mudah &
                    terdigitalisasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
