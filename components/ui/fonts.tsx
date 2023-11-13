import { Alice, Allison, Alumni_Sans, Open_Sans } from "next/font/google";

export const alice = Alice({ weight: ["400"], subsets: ["cyrillic"] });

export const allison = Allison({ weight: ["400"], subsets: ["latin"] });

export const aluminSans = Alumni_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});
