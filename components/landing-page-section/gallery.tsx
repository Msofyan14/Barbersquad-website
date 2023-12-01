import { HeadingSection } from "./heading-section";
import { getGallery } from "@/lib/actions/gallery.actions";
import { CardGallery } from "../card-gallery";

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
      <CardGallery data={gallery} totalImages={totalGalleryCount} />
    </section>
  );
}
