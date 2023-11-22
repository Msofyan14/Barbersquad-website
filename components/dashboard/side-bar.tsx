"use client";

import Image from "next/image";
import { alice } from "../ui/fonts";
import Link from "next/link";
import { sideBar } from "@/constants";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-y-2 w-fit bg-neutral-950 px-3 h-screen sticky left-0 top-0 z-20 border-r-2 max-md:hidden ">
      <div className="flex justify-center gap-x-2 items-center border-b-2 py-3 px-8 ">
        <Image src="/logo.svg" width={50} height={50} alt="logo" />
        <h1 className={`${alice.className} text-2xl text-neutral-50`}>
          Barbersquad
        </h1>
      </div>
      {sideBar.map((link) => {
        const isActive = pathname === link.href;

        return (
          <div
            key={link.title}
            className={`w-full rounded-lg p-2 text-neutral-50 ${
              !isActive && "hover:bg-neutral-700 "
            } `}
          >
            <Link
              href={link.href}
              className={`flex gap-x-2 text-center text-sm  ${
                isActive && "bg-neutral-700 rounded-lg p-2 "
              } `}
            >
              <Image src={link.icon} width={24} height={24} alt="icon" />
              {link.title}
            </Link>
          </div>
        );
      })}
    </aside>
  );
}
