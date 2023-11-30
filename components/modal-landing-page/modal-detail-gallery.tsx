"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDetailGallery } from "@/hooks/use-detail-gallery";
import Image from "next/image";
import { useState } from "react";

export function ModalDetailGallery() {
  const { isOpen, onClose, galleryById } = useDetailGallery();

  const [firstImage, setFirstImage] = useState(0);

  const handleClose = () => {
    setFirstImage(0);
    onClose();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Details gallery</DialogTitle>
            <DialogDescription>{galleryById?.name}</DialogDescription>
          </DialogHeader>

          <div className="flex max-sm:flex-col max-sm:gap-y-3  gap-x-3 ">
            <div className="relative w-full h-[220px] sm:h-full md:h-[420px] ">
              <Image
                src={
                  galleryById?.images[firstImage] || "/image-placeholder.png"
                }
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="gallery"
              />
            </div>
            <div className="max-sm:flex-row flex flex-col items-center max-sm:gap-x-3 gap-y-3 overflow-x-auto ">
              {galleryById?.images.map((img, index) => {
                const isSelected = firstImage === index;

                return (
                  <div
                    key={index}
                    onClick={() => setFirstImage(index)}
                    className={` relative h-full cursor-pointer 
                    `}
                  >
                    <Image
                      className={`object-cover h-full `}
                      src={img || "/image-placeholder.png"}
                      width={100}
                      height={80}
                      alt="gallery"
                    />
                    {isSelected && (
                      <div
                        className={`absolute inset-0 bg-neutral-950/60
                        border-double border-[3px] border-slate-500
                        
                        `}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
