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

import dynamic from "next/dynamic";

// const ModalLandingPageProvider = dynamic(() => import('../../components/modal-landing-page/modal-landing-page-provider'), { ssr: false , loading : () => <p>Loading...</p>,})

const DynamicGallery = dynamic(
  () => import("../../components/landing-page-section/gallery"),
  {
    loading: () => <CardGallerySkeleton />,
  }
);

const DynamicProducts = dynamic(
  () => import("../../components/landing-page-section/products"),
  {
    loading: () => <CardProductsSkeleton />,
  }
);

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
      <Suspense
        key={`gallery=${limitGallery}`}
        fallback={<CardGallerySkeleton />}
      >
        <DynamicGallery limitGallery={limitGallery} />
        {/* <Gallery limitGallery={limitGallery} /> */}
      </Suspense>
      <Suspense
        key={`products=${limitProducts}`}
        fallback={<CardProductsSkeleton />}
      >
        <DynamicProducts limitProducts={limitProducts} />
        {/* <Products limitProducts={limitProducts} /> */}
      </Suspense>
      <AboutUs />
      <div className="bg-neutral-950">
        <Address />
        <Footer />
      </div>
      {/* <ModalLandingPageProvider /> */}
    </main>
  );
}
