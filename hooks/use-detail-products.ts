import { IProducts } from "@/types";
import { create } from "zustand";

type TEditProductsStore = {
  isLoading: boolean;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLoading: () => void;
  onLoaded: () => void;
  productById: IProducts | undefined;
  setDetailProduct: (value: IProducts | undefined) => void;
};

export const useDetailProducts = create<TEditProductsStore>((set) => ({
  productById: undefined,
  isLoading: false,
  isOpen: false,
  onLoading: () => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setDetailProduct: (productById) => set({ productById }),
}));
