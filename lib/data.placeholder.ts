import { IProducts, ITeams, IUsers } from "@/types";

export const initialUsers: IUsers[] = [
  {
    email: "adminbarbersquad@gmail.com",
    name: "YogaYk",
    password: "rahasia",
  },
];

export const initialTeams: ITeams[] = [
  {
    name: "Yoga Yk",
    email: "yogayk@gmail.com",
    whatsapp: 6289769281282,
    image: "/model.png",
  },
  {
    name: "Muse",
    email: "Muse@gmail.com",
    whatsapp: 6289769281282,
    image: "/model.png",
  },
  {
    name: "Abel",
    email: "yogayk@gmail.com",
    whatsapp: 6289769281282,
    image: "/model.png",
  },
  {
    name: "Agus",
    email: "yogayk@gmail.com",
    whatsapp: 6289769281282,
    image: "/model.png",
  },
  {
    name: "wawan",
    email: "Muse@gmail.com",
    whatsapp: 6289769281282,
    image: "/model.png",
  },
  {
    name: "dower",
    email: "yogayk@gmail.com",
    whatsapp: 6289769281282,
    image: "/model.png",
  },
];

export const intialProducts: IProducts[] = [
  {
    name: "Pomade",
    price: 80000,
    description:
      "Elevate your hairstyling game with our Premium Hold Pomade, a grooming essential for the modern, style-conscious individual. Crafted with precision, our pomade is designed to provide a stronghold with a touch of flexibility, allowing you to experiment with a range of hairstyles.",
    images: ["/product.png", "/product.png", "/product.png", "/product.png"],
  },
  {
    name: "Clay",
    price: 80000,
    description:
      "Elevate your hairstyling game with our Premium Hold Pomade, a grooming essential for the modern, style-conscious individual. Crafted with precision, our pomade is designed to provide a stronghold with a touch of flexibility, allowing you to experiment with a range of hairstyles.",
    images: ["/product.png", "/product.png", "/product.png", "/product.png"],
  },
];
