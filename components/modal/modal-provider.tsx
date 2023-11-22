"use client";

import { useEffect, useState } from "react";
import ModalAddTeams from "./modal-add-teams";

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
    </>
  );
};
