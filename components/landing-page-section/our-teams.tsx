"use client";

import React from "react";
import { HeadingSection } from "./heading-section";
import { ourTeams } from "@/constants";
import Image from "next/image";
import { alice } from "../ui/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { ITeams } from "@/types";

interface IOurTeams {
  data: ITeams[];
}

export function OurTeams({ data }: IOurTeams) {
  return (
    <section id="our-teams" className="section-wrapper">
      <HeadingSection title="OUR TEAMS" />
      <div className="overflow-x-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 10,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          // modules={[Pagination]}
          modules={[EffectCoverflow, Pagination]}
          className="swiper-wrapper"
        >
          {data.map((team, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-y-3">
                <div
                  className={`relative ${
                    index % 2 === 0 ? "h-[280px]" : "h-[330px]"
                  } w-[225px]`}
                >
                  <Image
                    className="object-cover"
                    src={team.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    alt="barbers"
                  />
                </div>
                <h1 className={` ${alice.className} text-xl uppercase`}>
                  {team.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
