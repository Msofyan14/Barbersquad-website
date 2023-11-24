"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
// import { TableUsers, UsersData } from "@/components/table-users";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { ConfirmDialog } from "@/components/modal/confirm-modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { deleteTeam, editTeam, getTeamByid } from "@/lib/actions/teams.action";
import { toast } from "sonner";
import { useEditTeams } from "@/hooks/use-image-team";
import { TableProducts } from "./table-products";
import { useEdgeStore } from "@/lib/edgestore";
import { IProducts } from "@/types";

interface IColumns {
  page: number;
  limit: number;
  data: IProducts[];
  pageCount?: number;
}

export const ColumnProducts = ({ page, limit, data, pageCount }: IColumns) => {
  const pathname = usePathname();
  const modal = useEditTeams();

  const { edgestore } = useEdgeStore();

  const handleGetTeamById = async (id: string) => {
    try {
      modal.onOpen();
      const res = await getTeamByid(id);
      modal.setUserData(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onDelete = async (id: string, imgUrl: string) => {
    try {
      await edgestore.publicFiles.delete({
        url: imgUrl,
      });

      await deleteTeam(id, pathname).then(() => {
        toast.success("Succes delete team");
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
          <div className="capitalize">
            {+page === 1 ? row.index + 1 : (+page - 1) * limit + row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <div className="capitalize">Rp. {row.getValue("price")}</div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div className="capitalize max-w-sm max-sm:truncate">
            {row.getValue("description")}
          </div>
        ),
      },
      {
        accessorKey: "images",
        header: "Images",
        cell: ({ row }) => (
          <div className="">
            <div className="grid grid-cols-2 gap-2 md:gap-4 ">
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
          <div className="capitalize flex gap-x-2">
            <Button
              onClick={() => {
                handleGetTeamById(row.getValue("_id"));
              }}
              size="sm"
            >
              Edit
            </Button>
            <ConfirmDialog
              onConfirm={() =>
                onDelete(row.getValue("_id"), row.getValue("image"))
              }
            >
              <Button size="sm">Delete</Button>
            </ConfirmDialog>
          </div>
        ),
      },
    ];
  }, [page]);

  return <TableProducts data={data} columns={columns} pageCount={pageCount} />;
};
