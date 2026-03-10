import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Kost",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.className} antialiased selection:bg-orange-500 selection:text-white`}
      >
        <Navbar />
        <main className="bg-gray-50/50 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
