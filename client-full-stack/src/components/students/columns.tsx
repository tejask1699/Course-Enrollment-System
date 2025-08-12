"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

export interface StudentsData {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  created_at: string;
}
export const columns: ColumnDef<StudentsData>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return (
        <span>
          {createdAt ? format(new Date(createdAt), "MMM d, yyyy") : ""}
        </span>
      );
    },
  },
];
