"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { ConfirmDialog } from "@/components/dashboard/modal/confirm-modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { IProducts } from "@/types";
import { TableGallery } from "./table-gallery";
import { deleteGallery, getGalleryByid } from "@/lib/actions/gallery.actions";
import { useEditGallery } from "@/hooks/use-edit-gallery";

interface IColumns {
  page: number;
  limit: number;
  data: IProducts[];
  pageCount?: number;
}

export const ColumnGalery = ({ page, limit, data, pageCount }: IColumns) => {
  const pathname = usePathname();

  const { setGallery, onOpen } = useEditGallery();

  const { edgestore } = useEdgeStore();

  const handleGetGalleryById = async (id: string) => {
    try {
      onOpen();
      const res = await getGalleryByid(id);
      setGallery(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onDelete = async (id: string, imgUrl: string[]) => {
    try {
      await Promise.all(
        imgUrl.map(async (img) => {
          try {
            await edgestore.publicFiles.delete({
              url: img,
            });
          } catch (error: any) {
            toast.error(error.message);
          }
        })
      );

      await deleteGallery(id, pathname).then(() => {
        toast.success("Succes delete gallery");
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = React.useMemo<ColumnDef<IProducts>[]>(() => {
    return [
      {
        accessorKey: "no",
        header: "No",
        cell: ({ row }) => (
          <div className="capitalize max-md:text-xs">
            {+page === 1 ? row.index + 1 : (+page - 1) * limit + row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize max-md:text-xs">
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "images",
        header: "Images",
        cell: ({ row }) => (
          <div className="">
            <div className="flex justify-center items-center gap-x-2 ">
              {row.original.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  height={120}
                  width={120}
                  className="object-cover "
                  alt="profile"
                />
              ))}
            </div>
          </div>
        ),
      },

      {
        accessorKey: "_id",
        header: "Action",
        cell: ({ row }) => (
          <div className="capitalize flex gap-x-2 justify-center">
            <Button
              onClick={() => {
                handleGetGalleryById(row.getValue("_id"));
              }}
              size="sm"
            >
              Edit
            </Button>
            <ConfirmDialog
              onConfirm={() =>
                onDelete(row.getValue("_id"), row.getValue("images"))
              }
            >
              <Button size="sm">Delete</Button>
            </ConfirmDialog>
          </div>
        ),
      },
    ];
  }, [page]);

  return <TableGallery data={data} columns={columns} pageCount={pageCount} />;
};
