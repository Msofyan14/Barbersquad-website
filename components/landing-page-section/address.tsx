import Image from "next/image";
import React from "react";
import { HeadingSection } from "./heading-section";
import { alice } from "../ui/fonts";
import { openingHours } from "@/constants";

export function Address() {
  return (
    <section className="">
      <div className="relative w-full h-[150px] ">
        <Image
          className="object-cover"
          src="/ripped.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="ripped"
        />
      </div>

      <div className="section-wrapper lg:mb-0">
        <HeadingSection title="ADDRESS" textColor="text-neutral-50" />

        <div className="flex flex-wrap items-center justify-between gap-y-5">
          <div className="flex flex-col gap-y-3">
            <p className="text-neutral-50 max-w-[300px]">
              Perum Cikarang Baru Jl. Beruang Raya No.b2/2, Jayamukti, Central
              Cikarang, Bekasi Regency, West Java 17530
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6070468163043!2d107.16157027934572!3d-6.315238399999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b11b4d4c159%3A0x43f3cf15a07035ea!2sBARBERSQUAD%20INDONESIA!5e0!3m2!1sid!2sid!4v1699850121623!5m2!1sid!2sid"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-[330px] md:w-[350px] h-[350px]"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-neutral-50 max-w-[280px]">
              Jl. Industri Utara IV No.11, Mekarmukti, Kec. Cikarang Utara,
              Kabupaten Bekasi, Jawa Barat 17530
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7364048059553!2d107.15687297586119!3d-6.298327961644311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699bbb82595d15%3A0x63e73f13e1d11fe8!2sBarbersquad%20barbershop%20cikarang%20cabang%20pavilion!5e0!3m2!1sid!2sid!4v1699850640676!5m2!1sid!2sid"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-[330px] md:w-[350px] h-[350px]"
            />
          </div>

          <div className="flex flex-col gap-y-5">
            <div
              className={`${alice.className} text-neutral-50 underline text-5xl mb-5`}
            >
              Opening Hours
            </div>
            {openingHours.map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-neutral-50 text-lg md:text-xl"
              >
                <p className="">{day.day}</p>
                <p>{day.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
