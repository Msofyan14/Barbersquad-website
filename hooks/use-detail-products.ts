import { IProducts } from "@/types";
import { create } from "zustand";

type TEditProductsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  productById: IProducts | undefined;
  setDetailProduct: (value: IProducts) => void;
};

export const useDetailProducts = create<TEditProductsStore>((set) => ({
  productById: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setDetailProduct: (productById) => set({ productById }),
}));
