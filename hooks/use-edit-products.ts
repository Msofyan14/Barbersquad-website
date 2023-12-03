import { IProducts } from "@/types";
import { create } from "zustand";

type TEditProductStore = {
  isLoading: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLoading: () => void;
  onLoaded: () => void;
  productById: IProducts | undefined;
  setProducts: (value: IProducts) => void;
};

export const useEditProducts = create<TEditProductStore>((set) => ({
  productById: undefined,
  isLoading: false,
  isOpen: false,
  onLoading: () => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setProducts: (productById) => set({ productById }),
}));
