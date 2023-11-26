import { IProducts } from "@/types";
import { create } from "zustand";

type TEditProductStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  productById: IProducts | undefined;
  setProducts: (value: IProducts) => void;
};

export const useEditProducts = create<TEditProductStore>((set) => ({
  productById: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setProducts: (productById) => set({ productById }),
}));
