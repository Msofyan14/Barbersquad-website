"use client";

import { navbarLink } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { aluminSans } from "../ui/fonts";
import { Button } from "../ui/button";
import { PhoneOutgoing } from "lucide-react";
import { NavbarSheet } from "./navbar-sheet";
import Link from "next/link";

export function Navbar() {
  const [active, setActive] = useState("");
  const handleScroll = (sectionId: string) => {
    const nextSection = document.getElementById(sectionId);

    setActive(sectionId);
    if (nextSection) {
      nextSection?.classList.add("scroll-mt-[120px]");
      nextSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className=" bg-neutral-950 fixed z-[10] w-full">
      <div className=" max-w-[1440px] mx-auto ">
        <div className="flex flex-row px-6 lg:px-20 py-3 md:py-5 items-center justify-between ">
          <div className="relative w-[60px]  md:w-[80px] h-[60px] md:h-[80px]">
            <Image src="/logo.svg" fill alt="logo" priority />
          </div>
          <div className="hidden md:flex gap-x-5 lg:gap-x-[30px]">
            {navbarLink.map((nav) => (
              <ul key={nav.id}>
                <li
                  className={`${
                    aluminSans.className
                  } p-1 uppercase text-neutral-50 text-xl lg:text-[32px] cursor-pointer group hover:bg-white hover:text-neutral-950  hover:rounded hover:px-1 hover:py-0.5  transition-transform ${
                    active === nav.id &&
                    "bg-secondary text-neutral-950  rounded px-2 py-1 transform transition"
                  } `}
                  onClick={() => handleScroll(nav.id)}
                >
                  {nav.title}
                </li>
              </ul>
            ))}
          </div>
          <div className="hidden md:block">
            <Link
              aria-label="Calling"
              href="https://wa.me/+6285691534089"
              target="_blank"
            >
              <Button
                variant="ghost"
                className={`${aluminSans.className} uppercase text-white text-xl lg:text-[32px] `}
              >
                Contact us
                <PhoneOutgoing className="ml-3" />
              </Button>
            </Link>
          </div>
          <NavbarSheet />
        </div>
      </div>
    </nav>
  );
}
