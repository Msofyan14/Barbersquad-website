"use client";

import { Suspense, useEffect, useState } from "react";
// import { ModalDetailGallery } from "./modal-detail-gallery";
import { ModalDetailProducts } from "./modal-detail-products";
import { CardGallerySkeleton } from "../LoadingSkeleton";

import dynamic from "next/dynamic";
import { useModalProvider } from "@/hooks/use-modal-provider";

// const ModalDetailGallery = dynamic(
//   () => import("../../components/modal-landing-page/modal-detail-gallery"),
//   { ssr: false, loading: () => <p>Loading...</p> }
// );

const ModalDetailGallery = dynamic(
  () =>
    import("../../components/modal-landing-page/modal-detail-gallery").then(
      (mod) => mod.ModalDetailGallery
    ),
  {
    ssr: false,
    loading: () => <p className="text-5xl text-red-700">Loading...</p>,
  }
);

export const ModalLandingPageProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const modalProvider = useModalProvider();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {modalProvider.isOpen && (
        <>
          <ModalDetailGallery />
        </>
      )}

      <ModalDetailProducts />
    </>
  );
};
