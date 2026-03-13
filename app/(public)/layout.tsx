import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50/50 min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
