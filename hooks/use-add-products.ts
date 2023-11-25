import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddProducts = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
