"use client";

import { useEffect, useState } from "react";
import ModalAddTeams from "./modal-add-teams";
import ModalEditTeams from "./modal-edit-teams";
import ModalAddProducts from "./modal-add-products";
import ModalEditProducts from "./modal-edit-products";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalAddTeams />
      <ModalEditTeams />
      <ModalAddProducts />
      <ModalEditProducts />
    </>
  );
};
