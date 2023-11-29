import { AboutUs } from "@/components/about-us";
import { Address } from "@/components/address";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar/navbar";
import { OurTeams } from "@/components/our-teams";
import { Products } from "@/components/products";
import { Services } from "@/components/services";
import { getGallery } from "@/lib/actions/gallery.actions";
import { getProducts } from "@/lib/actions/products.actions";
import { getTeams } from "@/lib/actions/teams.actions";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const limit = searchParams?.gallery ? +searchParams.gallery : 6;

  const { data: teams } = await getTeams({});
  const { data: gallery, totalGalleryCount } = await getGallery({
    pageSize: limit,
  });
  const { data: products } = await getProducts({});

  return (
    <main id="home" className="relative">
      <Navbar />
      <Hero />
      <Services />
      <OurTeams data={teams} />
      <Gallery data={gallery} totalImages={totalGalleryCount} />
      <Products data={products} />
      <AboutUs />
      <div className="bg-neutral-950">
        <Address />
        <Footer />
      </div>
    </main>
  );
}
