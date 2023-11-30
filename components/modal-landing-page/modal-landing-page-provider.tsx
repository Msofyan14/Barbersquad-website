"use client";

import { useEffect, useState } from "react";
import { ModalDetailGallery } from "./modal-detail-gallery";

export const ModalLandingPageProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalDetailGallery />
    </>
  );
};
