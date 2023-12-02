"use client";

import { sideBar } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function BottomBar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sideBar.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              aria-label="this link to navigate your page"
              href={link.href}
              key={link.title}
              className={`bottombar_link text-neutral-50 ${
                isActive && "bg-neutral-700"
              }`}
            >
              <Image src={link.icon} width={24} height={24} alt="icon" />
              <p className="text-neutral-50 text-sm  max-sm:hidden">
                {link.title.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
