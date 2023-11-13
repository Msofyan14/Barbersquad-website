"use client";

import { Menu, PhoneOutgoing } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { aluminSans } from "../ui/fonts";
import { navbarLink } from "@/constants";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";

export function NavbarSheet() {
  const [active, setActive] = useState("");

  const handleScroll = (sectionId: string) => {
    const nextSection = document.getElementById(sectionId);

    if (nextSection) {
      setActive(sectionId);
      nextSection?.classList.add("scroll-mt-[120px]");
      nextSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="text-white w-8 h-8" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="mt-5">
              <Link href="https://wa.me/+6285691534089" target="_blank">
                <Button
                  variant="secondary"
                  className={`${aluminSans.className} uppercase  text-2xl lg:text-[32px] `}
                >
                  Contact us
                  <PhoneOutgoing className="ml-3" />
                </Button>
              </Link>
            </div>
            <div>
              <hr className="my-3" />
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-3 items-center">
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
        </SheetContent>
      </Sheet>
    </>
  );
}
