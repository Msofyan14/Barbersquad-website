"use client";

import { Suspense, useEffect, useState } from "react";
import { ModalDetailGallery } from "./modal-detail-gallery";
import { ModalDetailProducts } from "./modal-detail-products";
import { CardGallerySkeleton } from "../LoadingSkeleton";

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
      <Suspense key={Math.random()} fallback={<CardGallerySkeleton />}>
        <ModalDetailGallery />
      </Suspense>
      <ModalDetailProducts />
    </>
  );
};
