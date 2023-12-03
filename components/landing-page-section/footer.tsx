import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <section className=" text-neutral-50 pt-10 pb-4">
      <div className="section-wrapper lg:mb-0">
        <div className="relative max-w-[90%] h-[50px] mx-auto">
          <Image
            className="object-contain "
            src="/line-footer.svg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="line-footer"
          />
        </div>
        <div className="flex flex-col items-center gap-y-5">
          <p className="font-semibold text-4xl">Our Socials</p>
          <div className="flex flex-wrap gap-x-3">
            <Link
              aria-label="Instagram"
              href="https://www.instagram.com/barbersquad.id/"
              target="_blank"
            >
              <Button variant="ghost" className="px-2 py-7 rounded-full">
                <Instagram className="w-10 h-10" />
              </Button>
            </Link>
            <Link
              aria-label="Calling"
              href="https://wa.me/+6285691534089"
              target="_blank"
            >
              <Button variant="ghost" className="px-2 py-7 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 34"
                  fill="none"
                  className="fill-neutral-50 hover:fill-neutral-950 w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.5191 20.0159C25.0824 19.8085 22.9415 18.8092 22.543 18.6701C22.1444 18.5323 21.8542 18.4641 21.5626 18.8788C21.2725 19.2908 20.4387 20.2232 20.1852 20.4988C19.9302 20.7757 19.6767 20.8091 19.2415 20.6032C18.8063 20.3944 17.4025 19.9588 15.7393 18.5504C14.4454 17.4537 13.5706 16.0995 13.3171 15.6848C13.0636 15.2715 13.2893 15.0474 13.5076 14.8414C13.704 14.6563 13.9428 14.3585 14.1612 14.1177C14.3795 13.8756 14.4513 13.703 14.5964 13.426C14.7429 13.1505 14.6696 12.9097 14.5597 12.7023C14.4513 12.495 13.5809 10.4589 13.2175 9.6308C12.8643 8.82499 12.5053 8.93494 12.2386 8.92102C11.9836 8.90989 11.6935 8.90711 11.4034 8.90711C11.1132 8.90711 10.6414 9.01009 10.2428 9.42483C9.84276 9.83817 8.71884 10.8388 8.71884 12.8749C8.71884 14.9096 10.278 16.8761 10.4963 17.1531C10.7146 17.4286 13.5662 21.6066 17.9344 23.3978C18.9748 23.8236 19.7852 24.0783 20.4167 24.2676C21.4601 24.5835 22.4096 24.539 23.1599 24.4318C23.9951 24.3135 25.736 23.4312 26.0994 22.4653C26.4613 21.4994 26.4613 20.6714 26.3529 20.4988C26.2444 20.3262 25.9543 20.2232 25.5176 20.0159H25.5191ZM17.574 30.3188H17.5681C14.9736 30.3193 12.4267 29.6569 10.1944 28.401L9.66692 28.1032L4.18358 29.4699L5.64746 24.3928L5.30311 23.8723C3.85261 21.6795 3.085 19.1416 3.08896 16.5519C3.09189 8.96695 9.58926 2.79604 17.5798 2.79604C21.4483 2.79604 25.0854 4.22951 27.8197 6.82926C29.1684 8.10489 30.2373 9.62185 30.9647 11.2924C31.6922 12.9629 32.0636 14.7539 32.0575 16.5616C32.0546 24.1465 25.5572 30.3188 17.574 30.3188ZM29.9005 4.8544C28.286 3.31087 26.3649 2.087 24.2488 1.25372C22.1326 0.420447 19.8633 -0.00567302 17.5725 5.70295e-05C7.96858 5.70295e-05 0.149466 7.42492 0.146535 16.5505C0.142085 19.4547 0.944235 22.3086 2.47205 24.8243L0 33.4015L9.23757 31.0996C11.793 32.4219 14.6566 33.1147 17.5666 33.1148H17.574C27.1779 33.1148 34.997 25.6899 34.9999 16.563C35.007 14.3881 34.56 12.2335 33.6847 10.2237C32.8094 8.21398 31.5232 6.38901 29.9005 4.8544Z
                    "
                  />
                </svg>
              </Button>
            </Link>
          </div>
          <p className="font-semibold text-sm md:text-xl text-center">
            Copyrights © 2023 All Rights Reserved by Barbersquad
          </p>
        </div>
      </div>
    </section>
  );
}
