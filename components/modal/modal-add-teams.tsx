"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAddTeams } from "@/hooks/use-add-teams";

export default function ModalAddTeams() {
  const modal = useAddTeams();

  return (
    <div>
      <Sheet open={modal.isOpen} onOpenChange={modal.onClose}>
        <SheetContent side={"bottom"} className="h-[70%]">
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
