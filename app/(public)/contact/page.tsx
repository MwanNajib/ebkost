import { Metadata } from "next";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us - EbKost",
  description: "Get in touch with EbKost today",
};

export default function ContactPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Side: Contact Information */}
        <div className="space-y-12 pr-0 lg:pr-10">
          <div>
            <p className="text-[#f08519] font-bold mb-3 uppercase tracking-widest text-sm">
              Hubungi Kami
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a2332] leading-tight mb-6">
              Mari Berbincang Dengan Kami
            </h1>
            <p className="text-gray-500 leading-relaxed text-lg font-medium">
              Apakah Anda memiliki pertanyaan mengenai fasilitas, pemesanan,
              atau sekadar ingin berkonsultasi? Jangan ragu untuk menghubungi
              tim kami. Kami siap melayani Anda sepenuh hati.
            </p>
          </div>

          <div className="space-y-10">
            {/* Email Contact */}
            <div className="flex items-start gap-6 group">
              <div className="size-16 shrink-0 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                <IoMailOutline className="size-8 text-gray-700 group-hover:text-orange-600 transition-colors" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Email :
                </h3>
                <p className="text-gray-500 font-medium">admin@ebkost.com</p>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="flex items-start gap-6 group">
              <div className="size-16 shrink-0 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                <IoCallOutline className="size-8 text-gray-700 group-hover:text-green-600 transition-colors" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  WhatsApp :
                </h3>
                <p className="text-gray-500 font-medium">+62 812 3456 7890</p>
              </div>
            </div>

            {/* Address Contact */}
            <div className="flex items-start gap-6 group">
              <div className="size-16 shrink-0 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <IoLocationOutline className="size-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Alamat :
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Jl. Ir. H. Juanda No. 1, Karanganyar, Neglasari, Kota
                  Tangerang, Banten
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full h-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
