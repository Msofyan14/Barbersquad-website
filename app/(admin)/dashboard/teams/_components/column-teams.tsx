"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/modal/confirm-modal";
import { TableTeams } from "./table-teams";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { deleteTeam, getTeamByid } from "@/lib/actions/teams.actions";
import { toast } from "sonner";
import { useEditTeams } from "@/hooks/use-edit-team";
import { useEdgeStore } from "@/lib/edgestore";
import { ITeams } from "@/types";

interface IColumns {
  page: number;
  limit: number;
  data: ITeams[];
  pageCount?: number;
}

export const ColumnTeams = ({ page, limit, data, pageCount }: IColumns) => {
  const pathname = usePathname();
  const { onOpen, setUserData, onLoading, onLoaded } = useEditTeams();
  const { edgestore } = useEdgeStore();

  const handleGetTeamById = async (id: string) => {
    try {
      onOpen();
      onLoading();
      const res = await getTeamByid(id);
      setUserData(res);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      onLoaded();
    }
  };

  const onDelete = async (id: string, imgUrl: string) => {
    try {
      if (imgUrl) {
        await edgestore.publicFiles.delete({
          url: imgUrl,
        });
      }

      await deleteTeam(id, pathname).then(() => {
        toast.success("Succes delete team");
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = React.useMemo<ColumnDef<ITeams>[]>(() => {
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
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "whatsapp",
        header: "Whatsapp",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("whatsapp")}</div>
        ),
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
          <div className="">
            <Image
              src={row.getValue("image")}
              height={50}
              width={50}
              className="object-cover"
              alt="profile"
            />
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

  return <TableTeams data={data} columns={columns} pageCount={pageCount} />;
};
