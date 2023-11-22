"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
// import { TableUsers, UsersData } from "@/components/table-users";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { ConfirmDialog } from "@/components/modal/confirm-modal";
import { TableTeams } from "./table-teams";
import { ITeams } from "@/lib/data.placeholder";

interface ColumnsProps {
  page: number;
  limit: number;
  data: ITeams[];
  pageCount?: number;
}

export const ColumnTeams = ({ page, limit, data, pageCount }: ColumnsProps) => {
  // const modal = useEditModal();
  // const userDataById = useUserDataById();
  // const usersData = useUsersData();

  // const onSubmit = async (id: number) => {
  //   const userById = await getUserById(id);
  //   userDataById.setUserData(userById);
  //   modal.onOpen();
  // };

  // const { data: users } = getUsers(page, limit);
  // const { mutate: deleteUser } = onDeleteUser();

  // useEffect(() => {
  //   usersData.setUserData(users.data);
  // }, [users.data]);

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
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="capitalize flex gap-x-2">
            <Button
              // onClick={() => {
              //   onSubmit(row.getValue("id"));
              // }}
              size="sm"
            >
              Edit
            </Button>
            <ConfirmDialog

            // onConfirm={() => deleteUser(row.getValue("id"))}
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
