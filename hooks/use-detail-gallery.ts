import { IGallery } from "@/types";
import { create } from "zustand";

type TEditGalleryStore = {
  isLoading: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLoading: () => void;
  onLoaded: () => void;
  galleryById: IGallery | undefined;
  setDetailGallery: (value: IGallery | undefined) => void;
};

export const useDetailGallery = create<TEditGalleryStore>((set) => ({
  galleryById: undefined,
  isLoading: false,
  isOpen: false,
  onLoading: () => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setDetailGallery: (galleryById) => set({ galleryById }),
}));
