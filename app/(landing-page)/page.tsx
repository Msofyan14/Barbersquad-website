import { AboutUs } from "@/components/about-us";
import { Address } from "@/components/address";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar/navbar";
import { OurTeams } from "@/components/our-teams";
import { Products } from "@/components/products";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <main id="home" className="relative">
      <Navbar />
      <Hero />
      <Services />
      <OurTeams />
      <Gallery />
      <Products />
      <AboutUs />
      <div className="bg-neutral-950">
        <Address />
        <Footer />
      </div>
    </main>
  );
}
