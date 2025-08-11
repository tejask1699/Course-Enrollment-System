"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CourseSchema } from "./course.modal"
import { format } from "date-fns" // npm install date-fns

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
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.original.created_at;
            return (
                <span>
                    {createdAt
                        ? format(new Date(createdAt), "MMM d, yyyy")
                        : ""}
                </span>
            );
        },
    },
]
