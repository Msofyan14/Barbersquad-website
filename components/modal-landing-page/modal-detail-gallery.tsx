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
import { ModalDetailGallerySkeleton } from "../LoadingSkeleton";

export function ModalDetailGallery() {
  const { isOpen, onClose, galleryById, isLoading, setDetailGallery } =
    useDetailGallery();

  const [firstImage, setFirstImage] = useState(0);

  const handleClose = () => {
    setFirstImage(0);
    setDetailGallery(undefined);
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

          {isLoading ? (
            <ModalDetailGallerySkeleton />
          ) : (
            <div className="flex  max-md:flex-col max-md:gap-y-3  gap-x-3 ">
              <div className="relative w-full h-[220px]  md:h-[550px]  shadow-md ">
                {galleryById?.images && (
                  <Image
                    src={galleryById?.images[firstImage]}
                    className="object-cover "
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="gallery"
                  />
                )}
              </div>
              <div className="max-md:flex-row flex flex-col items-center max-md:gap-x-3 gap-y-3 overflow-x-auto ">
                {galleryById?.images.map((img, index) => {
                  const isSelected = firstImage === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setFirstImage(index)}
                      className={` relative h-full  md:h-[96px] cursor-pointer
                    
                    ${galleryById.images.length === 1 && "hidden"}
                    `}
                    >
                      <Image
                        className={`object-cover w-full h-full `}
                        src={img}
                        width={80}
                        height={80}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="gallery"
                      />
                      {isSelected && (
                        <div
                          className={`absolute inset-0 bg-neutral-950/60
                       
                        
                        `}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
