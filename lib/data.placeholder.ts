interface IUsers {
  email: string;
  name: string;
  password: string;
}

export interface ITeams {
  name: string;
  email: string;
  whatsapp: number;
  image: string;
}

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
