"use client";

import { CourseSchema } from "@/types/course-data";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"; // npm install date-fns

export const columns: ColumnDef<CourseSchema>[] = [
  {
    accessorKey: "course_name",
    header: "Course Name",
  },
  {
    accessorKey: "course_code",
    header: "Course Code",
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.original.duration;
      return (
        <span>
          {duration} {duration === 1 ? "week" : "weeks"}
        </span>
      );
    },
  },
  {
    accessorKey: "levels",
    header: "Level",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "max_students",
    header: "Limit of Students",
  },
 {
  accessorKey: "is_free",
  header: "Cost",
  cell: ({ row }) => {
    const free = row.original.is_free;
    const price = row.original.price;

    return (
      <span>
        {free ? "Free" : price ? `Rs${price}` : "Not Set"}
      </span>
    );
  },
},
  {
    accessorKey: "certificate_available",
    header: "Certificate",
    cell: ({ row }) => {
      const certificate = row.original.certificate_available;
      return <span>{certificate ? "Available" : "Un Available"}</span>;
    },
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
