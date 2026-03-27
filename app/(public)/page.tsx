import Hero from "@/components/hero";
import Main from "@/components/main";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import { Suspense } from "react";
import { CardGridSkeleton } from "@/components/skeletons/card-skeleton";
import { auth } from "@/auth";
import SortRooms from "@/components/sort-rooms";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const session = await auth();
  const resolvedSearchParams = await searchParams;
  const sort = resolvedSearchParams.sort;

  return (
    <div>
      <section id="home">
        <Hero isLoggedIn={!!session} />
      </section>

      <section id="rooms" className="mt-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900 mb-2">Kamar Kost Terpopuler</h1>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mb-4" />
          <p className="py-3 text-gray-600 max-w-2xl mx-auto px-4 font-medium italic">
            "Temukan kenyamanan hunian impian Anda dengan fasilitas lengkap, lokasi strategis, dan harga yang jujur di EbKost."
          </p>
        </div>

        <SortRooms />
        
        <Suspense key={sort} fallback={<CardGridSkeleton />}>
          <Main sort={sort} />
        </Suspense>
      </section>



      <section id="about" className="border-t border-gray-100 mt-16 pt-16">
        <AboutPage />
      </section>

      <section id="contact" className="border-t border-gray-100">
        <ContactPage />
      </section>
    </div>
  );
}


