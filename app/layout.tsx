import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "EbKost - Online Booking Kost",
    template: "%s | EbKost",
  },
  description: "Platform booking kamar kost online terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${plusJakarta.className} antialiased selection:bg-orange-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
