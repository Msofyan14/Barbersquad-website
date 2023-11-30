import { IGallery } from "@/types";
import { create } from "zustand";

type TEditGalleryStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  galleryById: IGallery | undefined;
  setDetailGallery: (value: IGallery) => void;
};

export const useDetailGallery = create<TEditGalleryStore>((set) => ({
  galleryById: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setDetailGallery: (galleryById) => set({ galleryById }),
}));
