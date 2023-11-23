import { TDataTeam } from "@/lib/actions/teams.action";
import { create } from "zustand";

type TImageTeams = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  userData: TDataTeam | undefined;
  setUserData: (value: TDataTeam) => void;
  onReplace: (url: string) => void;
};

export const useEditTeams = create<TImageTeams>((set) => ({
  url: undefined,
  userData: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  setUserData: (userData) => set({ userData }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
