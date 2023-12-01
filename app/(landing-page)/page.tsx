import { AboutUs } from "@/components/landing-page-section/about-us";
import { Address } from "@/components/landing-page-section/address";
import { Footer } from "@/components/landing-page-section/footer";
import Gallery from "@/components/landing-page-section/gallery";
import { Hero } from "@/components/landing-page-section/hero";
import { Navbar } from "@/components/navbar/navbar";
import OurTeams from "@/components/landing-page-section/our-teams";
import Products from "@/components/landing-page-section/products";
import { Services } from "@/components/landing-page-section/services";
import { Suspense } from "react";
import {
  CardGallerySkeleton,
  CardOurTeamsSkeleton,
  CardProductsSkeleton,
} from "@/components/LoadingSkeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const limitGallery = searchParams?.gallery ? +searchParams.gallery : 6;
  const limitProducts = searchParams?.products ? +searchParams.products : 4;

  return (
    <main id="home" className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Suspense fallback={<CardOurTeamsSkeleton />}>
        <OurTeams />
      </Suspense>
      <Suspense key={limitGallery} fallback={<CardGallerySkeleton />}>
        <Gallery limitGallery={limitGallery} />
      </Suspense>
      <Suspense key={limitProducts} fallback={<CardProductsSkeleton />}>
        <Products limitProducts={limitProducts} />
      </Suspense>
      <AboutUs />
      <div className="bg-neutral-950">
        <Address />
        <Footer />
      </div>
    </main>
  );
}
