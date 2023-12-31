export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface IUsers {
  email: string;
  name: string;
  password: string;
}

export interface ITeams {
  _id?: string | undefined;
  name: string;
  email: string;
  whatsapp: number;
  image: string;
}

export interface IProducts {
  _id?: string | undefined;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export interface IGallery {
  _id?: string | undefined;
  name: string;
  images: string[];
}
