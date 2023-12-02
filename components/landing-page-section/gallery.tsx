import { HeadingSection } from "./heading-section";
import { getGallery } from "@/lib/actions/gallery.actions";
import { CardGallery } from "../card-gallery";
import { Suspense } from "react";
import { CardGallerySkeleton } from "../LoadingSkeleton";

export default async function Gallery({
  limitGallery,
}: {
  limitGallery: number;
}) {
  const { data: gallery, totalGalleryCount } = await getGallery({
    pageSize: limitGallery,
  });

  return (
    <section id="gallery" className="section-wrapper">
      <HeadingSection title="GALLERY" />
      <Suspense key={Math.random()} fallback={<CardGallerySkeleton />}>
        <CardGallery data={gallery} totalImages={totalGalleryCount} />
      </Suspense>
    </section>
  );
}
