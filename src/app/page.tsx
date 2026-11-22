import { Banner } from "@/components/Banner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FAQs } from "@/components/FAQs";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-white">
      <Banner />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoTicker />
        <Features />
        <ProductShowcase />
        <FAQs />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
