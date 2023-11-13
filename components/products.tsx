import React from "react";
import { HeadingSection } from "./heading-section";
import Image from "next/image";
import { products } from "@/constants";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { alice } from "./ui/fonts";

export function Products() {
  return (
    <section id="products" className="section-wrapper">
      <HeadingSection title="PRODUCTS" />

      <div className="flex flex-col gap-y-[40px] items-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {products.map((img, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div
                className={`
              group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-md shadow-lg`}
              >
                <div
                  className={` 
           relative  md:w-full h-[200px] md:h-[260px]  `}
                >
                  <Image
                    className="object-cover   transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 overflow-hidden"
                    src={img.image}
                    fill
                    alt="gallery"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 transition-all duration-500 group-hover:bg-neutral-950/30"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 ">
                  <Button className="text-white rounded-full ">
                    <Eye className="mr-1" />
                    Details
                  </Button>
                </div>
              </div>
              <div
                className={`mt-3 ${alice.className} text-center bg-[#D9D9D9] 
                  rounded-b-lg py-1 `}
              >
                <h1 className=" text-sm md:text-xl">Pomade Oil Based </h1>
                <h1 className=" text-sm md:text-xl">Rp. 120.000</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Button>Show More</Button>
        </div>
      </div>
    </section>
  );
}
