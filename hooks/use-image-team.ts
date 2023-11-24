import { ITeams } from "@/types";
import { create } from "zustand";

type TImageTeams = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  teamByid: ITeams | undefined;
  setUserData: (value: ITeams) => void;
};

export const useEditTeams = create<TImageTeams>((set) => ({
  teamByid: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setUserData: (teamByid) => set({ teamByid }),
}));
