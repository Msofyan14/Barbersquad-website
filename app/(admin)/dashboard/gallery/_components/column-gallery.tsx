"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { ConfirmDialog } from "@/components/modal/confirm-modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { IProducts } from "@/types";
import { useEditProducts } from "@/hooks/use-edit-products";
import { deleteProduct, getProductByid } from "@/lib/actions/products.actions";
import { TableGallery } from "./table-gallery";

interface IColumns {
  page: number;
  limit: number;
  data: IProducts[];
  pageCount?: number;
}

export const ColumnGalery = ({ page, limit, data, pageCount }: IColumns) => {
  const pathname = usePathname();
  const { setProducts, onOpen } = useEditProducts();

  const { edgestore } = useEdgeStore();

  const handleGetProductById = async (id: string) => {
    try {
      onOpen();
      const res = await getProductByid(id);
      setProducts(res);
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

      await deleteProduct(id, pathname).then(() => {
        toast.success("Succes delete product");
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
        accessorKey: "images",
        header: "Images",
        cell: ({ row }) => (
          <div className="">
            <div className="flex justify-center items-center gap-x-2 ">
              {row.original.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  height={80}
                  width={80}
                  className="object-cover w-full"
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
                handleGetProductById(row.getValue("_id"));
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
