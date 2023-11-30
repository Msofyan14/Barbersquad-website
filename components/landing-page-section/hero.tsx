import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { alice } from "../ui/fonts";

export function Hero() {
  return (
    <div className="relative w-full h-[70vh] md:h-screen mx-auto  flex items-center justify-center">
      <Image
        className="object-cover"
        src="/hero.png"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="hero"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
        <Button
          variant="secondary"
          className={`${alice.className} px-10 md:px-16 py-7 text-3xl shadow-xl  `}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
