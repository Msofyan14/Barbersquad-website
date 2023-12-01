"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDetailProducts } from "@/hooks/use-detail-products";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

export function ModalDetailProducts() {
  const { isOpen, onClose, productById } = useDetailProducts();

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
            <DialogTitle>Detail Products</DialogTitle>
          </DialogHeader>

          <div className="flex  max-md:flex-col max-sm:gap-y-3  gap-x-5  ">
            <div className="flex flex-col gap-y-3">
              <div className="relative w-full h-[160px]  md:h-[320px]  ">
                <Image
                  src={
                    productById?.images[firstImage] || "/image-placeholder.png"
                  }
                  className="object-cover "
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="gallery"
                />
              </div>
              <div className="flex items-center gap-x-3 overflow-x-auto ">
                {productById?.images.map((img, index) => {
                  const isSelected = firstImage === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setFirstImage(index)}
                      className={` relative  cursor-pointer 
                    `}
                    >
                      <Image
                        className={`object-cover   `}
                        src={img || "/image-placeholder.png"}
                        width={80}
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

            <div className=" flex flex-1 flex-col justify-between">
              <div className="w-full">
                <h1 className="font-semibold text-xl md:text-3xl">
                  {productById?.name}
                </h1>
                <h1 className="font-semibold text-xl md:text-3xl">
                  Rp. {productById?.price}
                </h1>
                <p className="text-slate-400 my-3">Description</p>
                <hr className="w-full my-3 border-black" />
                <p className="max-w-[400px] text-sm max-sm:h-[100px] overflow-y-auto">
                  {productById?.description}
                </p>
              </div>
              <div className="max-md:pt-3">
                <Button className="w-full">Buy Now</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
