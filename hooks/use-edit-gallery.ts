import { IGallery } from "@/types";
import { create } from "zustand";

type TEditGalleryStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  galleryById: IGallery | undefined;
  setGallery: (value: IGallery) => void;
};

export const useEditGallery = create<TEditGalleryStore>((set) => ({
  galleryById: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setGallery: (galleryById) => set({ galleryById }),
}));
