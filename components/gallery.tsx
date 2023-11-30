"use client";

import { HeadingSection } from "./heading-section";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { IGallery } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IGalleryProps {
  data: IGallery[];
  totalImages: number;
}

export function Gallery({ data, totalImages }: IGalleryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const valueGallery = data.length;

  const params = new URLSearchParams(searchParams);
  const galleryParams = params.get("gallery");

  const handleShowMore = async () => {
    if (!galleryParams || +galleryParams < totalImages) {
      params.set("gallery", (valueGallery + 2).toString());
    } else {
      params.delete("gallery");

      const nextSection = document.getElementById("gallery");
      if (nextSection) {
        nextSection?.classList.add("scroll-mt-[120px]");
        nextSection?.scrollIntoView({ behavior: "smooth" });
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="gallery" className="section-wrapper">
      <HeadingSection title="GALLERY" />

      <div className="flex flex-col gap-y-[40px] items-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {data.map((img, index) => {
            return (
              <div
                key={index}
                className={`
            ${index === 1 && "md:col-span-2 "} 
              ${
                index === 2 &&
                "lg:row-span-2  lg:h-[540px] md:w-full md:h-[250px] "
              }
              group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30`}
              >
                <div
                  className={` 
                relative  md:w-full h-[200px] md:h-[260px] ${
                  index === 2 && "lg:h-full"
                }  `}
                >
                  <Image
                    className="object-cover   transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 overflow-hidden"
                    src={img.images[0]}
                    fill
                    alt="gallery"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 transition-all duration-500 group-hover:bg-neutral-950/30"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 ">
                  <Button className={`text-white rounded-full `}>
                    <Eye className="mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center gap-y-2">
          {totalImages > data.length && (
            <>
              <Button onClick={handleShowMore}>Show More</Button>
              <ChevronDown />
            </>
          )}
          {totalImages === data.length && galleryParams && (
            <>
              <ChevronUp />
              <p className="text-slate-500"> All images already shown</p>
              <Button onClick={handleShowMore}>Show Less</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
