import { IGallery } from "@/types";
import { create } from "zustand";

type TEditGalleryStore = {
  isLoading: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onLoading: () => void;
  onLoaded: () => void;
  onClose: () => void;
  galleryById: IGallery | undefined;
  setGallery: (value: IGallery) => void;
};

export const useEditGallery = create<TEditGalleryStore>((set) => ({
  galleryById: undefined,
  isLoading: false,
  isOpen: false,
  onLoading: () => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setGallery: (galleryById) => set({ galleryById }),
}));
