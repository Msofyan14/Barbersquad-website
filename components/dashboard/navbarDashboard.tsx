"use client";

import Image from "next/image";
import React from "react";
import { alice } from "../ui/fonts";
import { LogOut, User2 } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ICurrentUser {
  currentUser?: string | undefined;
}

export function NavbarDashboard({ currentUser }: ICurrentUser) {
  return (
    <div className=" bg-neutral-950 w-full py-3 md:py-5 px-5 md:px-10 flex justify-between lg:justify-end items-center fixed z-10 left-0  ">
      <div className="flex justify-center gap-x-2 items-center lg:hidden ">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
        <h1 className={`${alice.className} text-xl text-neutral-50`}>
          Barbersquad
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src="/model.png"
              alt="avatar"
              className="cursor-pointer hover:focus:ring-1"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 absolute -right-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User2 className="w-5 h-5 mr-2" />
            {currentUser}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
