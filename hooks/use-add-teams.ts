import { ModalStore } from "@/types";
import { create } from "zustand";

export const useAddTeams = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
