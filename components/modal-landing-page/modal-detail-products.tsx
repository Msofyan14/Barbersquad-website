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
import { NumericFormat } from "react-number-format";
import { ModalDetailProductsSkeleton } from "../LoadingSkeleton";
import { useRouter } from "next/navigation";

export function ModalDetailProducts() {
  const { isOpen, onClose, productById, isLoading, setDetailProduct } =
    useDetailProducts();

  const router = useRouter();

  const [firstImage, setFirstImage] = useState(0);

  const handleClose = () => {
    setFirstImage(0);
    setDetailProduct(undefined);
    onClose();
  };

  const handleCheckout = () => {
    const formattedPrice = productById?.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    const priceWithoutCents = formattedPrice?.replace(",00", "");
    const formatOrder = "Hallo saya mau order products berikut :";
    const orderProduct = `${formatOrder}\n Product : ${productById?.name}\n Price : ${priceWithoutCents} `;

    const waLink = `https://wa.me/+6285691534089?text=${encodeURIComponent(
      orderProduct
    )}`;

    router.push(waLink);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Products</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <ModalDetailProductsSkeleton />
          ) : (
            <div className="flex  max-md:flex-col max-sm:gap-y-3  gap-x-5  ">
              <div className="flex flex-col gap-y-3">
                <div className="relative w-full md:w-[360px] h-[160px]  md:h-[320px] shadow-md ">
                  {productById?.images && (
                    <Image
                      src={productById?.images[firstImage]}
                      className="object-cover "
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="gallery"
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-3 overflow-x-auto ">
                  {productById?.images.map((img, index) => {
                    const isSelected = firstImage === index;

                    return (
                      <div
                        key={index}
                        onClick={() => setFirstImage(index)}
                        className={`relative  h-full  cursor-pointer 
                      ${productById.images.length === 1 && "hidden"}
                    `}
                      >
                        <Image
                          className={`object-cover h-full`}
                          src={img}
                          width={80}
                          height={80}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt="products"
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

              <div className=" flex flex-1 flex-col justify-between">
                <div className="w-full">
                  <h1 className="font-semibold text-xl md:text-3xl">
                    {productById?.name}
                  </h1>
                  <h1 className="font-semibold text-xl md:text-3xl">
                    <NumericFormat
                      prefix="Rp. "
                      value={productById?.price}
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </h1>
                  <p className="text-slate-400 my-3">Description</p>
                  <hr className="w-full my-3 border-black" />
                  <p className="max-w-[400px] text-sm max-sm:h-[100px] overflow-y-auto">
                    {productById?.description}
                  </p>
                </div>
                <div className="max-md:pt-3">
                  <Button onClick={handleCheckout} className="w-full">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
