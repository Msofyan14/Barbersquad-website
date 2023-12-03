import { ITeams } from "@/types";
import { create } from "zustand";

type TEditTeamsStore = {
  isLoading: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLoading: () => void;
  onLoaded: () => void;
  teamByid: ITeams | undefined;
  setUserData: (value: ITeams) => void;
};

export const useEditTeams = create<TEditTeamsStore>((set) => ({
  teamByid: undefined,
  isLoading: false,
  isOpen: false,
  onLoading: () => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setUserData: (teamByid) => set({ teamByid }),
}));
