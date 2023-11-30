import { AboutUs } from "@/components/landing-page-section/about-us";
import { Address } from "@/components/landing-page-section/address";
import { Footer } from "@/components/landing-page-section/footer";
import { Gallery } from "@/components/landing-page-section/gallery";
import { Hero } from "@/components/landing-page-section/hero";
import { Navbar } from "@/components/navbar/navbar";
import { OurTeams } from "@/components/landing-page-section/our-teams";
import { Products } from "@/components/landing-page-section/products";
import { Services } from "@/components/landing-page-section/services";
import { getGallery } from "@/lib/actions/gallery.actions";
import { getProducts } from "@/lib/actions/products.actions";
import { getTeams } from "@/lib/actions/teams.actions";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const limitGallery = searchParams?.gallery ? +searchParams.gallery : 6;
  const limitProducts = searchParams?.products ? +searchParams.products : 4;

  const { data: teams } = await getTeams({});
  const { data: gallery, totalGalleryCount } = await getGallery({
    pageSize: limitGallery,
  });
  const { data: products, totalProductCount } = await getProducts({
    pageSize: limitProducts,
  });

  return (
    <main id="home" className="relative">
      <Navbar />
      <Hero />
      <Services />
      <OurTeams data={teams} />
      <Gallery data={gallery} totalImages={totalGalleryCount} />
      <Products data={products} totalProducts={totalProductCount} />
      <AboutUs />
      <div className="bg-neutral-950">
        <Address />
        <Footer />
      </div>
    </main>
  );
}
