import React from "react";
import { alice, allison } from "./ui/fonts";
import Image from "next/image";
import { services } from "@/constants";

export function Services() {
  return (
    <section className="section-wrapper">
      <div className="flex flex-col justify-center items-center">
        <div className="relative h-[60px] md:h-[90px] w-[20px]">
          <Image src="/line.svg" fill alt="line" />
        </div>

        <div id="services">
          <h1
            className={`${allison.className} text-center text-red-500  text-[30px] md:text-[40px]`}
          >
            Barbersquad
          </h1>
          <div className="flex gap-x-5 items-center -mt-5 md:-mt-7">
            <hr className="w-[70px] md:w-[200px] border-[1.5px] border-black" />
            <h1
              className={`${alice.className} text-[32px]  md:text-[48px] uppercase `}
            >
              Services
            </h1>
            <hr className="w-[70px] md:w-[200px] border-[1.5px] border-black" />
          </div>
        </div>

        <div className="flex flex-wrap gap-7 justify-center mt-10 ">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-3 items-center justify-center border p-2 md:p-6"
            >
              <div className="relative w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
                <Image src={service.icon} fill alt={service.title} />
              </div>
              <h1
                className={`${alice.className} text-[30px]  md:text-[40px]  `}
              >
                {service.title}
              </h1>
              <hr className="w-[100px] border border-black" />
              <p className="text-center text-[10px] md:text-[16px] leading-normal  w-[120px]  md:w-[220px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
