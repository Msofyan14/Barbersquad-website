import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IDashboardCardOverview {
  totalItem: number;
  title: string;
  icon: string;
  link: string;
}

export function DashboardCardOverview({
  totalItem,
  title,
  icon,
  link,
}: IDashboardCardOverview) {
  return (
    <div className="">
      <Link href={link}>
        <div className="flex flex-col gap-y-3 items-center  rounded-lg bg-neutral-300 p-3 w-[250px] cursor-pointer">
          <Image src={icon} width={50} height={50} alt="icon" />
          <p className="font-semibold text-4xl">{totalItem}</p>
          <p>Total {title}</p>
        </div>
      </Link>
    </div>
  );
}
