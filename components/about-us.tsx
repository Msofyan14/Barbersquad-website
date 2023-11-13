import React from "react";
import { HeadingSection } from "./heading-section";
import Image from "next/image";

export function AboutUs() {
  return (
    <section id="about-us" className="section-wrapper">
      <HeadingSection title="ABOUT US" />

      <div className="relative w-full h-[320px] md:h-[520px]">
        <Image
          className="object-cover"
          src="/about-us.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="about-us"
        />
      </div>
      <div className="px-10">
        <p className="">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos officia
          commodi obcaecati reiciendis voluptatum inventore maxime, quam fugiat
          odit eos minus molestias consequatur ipsum quod, hic necessitatibus
          similique rem tempora. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quos officia commodi obcaecati reiciendis voluptatum
          inventore maxime, quam fugiat odit eos minus molestias consequatur
          ipsum quod, hic necessitatibus similique rem tempora.
        </p>
      </div>
    </section>
  );
}
