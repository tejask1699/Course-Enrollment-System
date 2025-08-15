"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/data-table";
import { columns } from "@/components/courses/columns";
import { AddCourseDialog, Levels } from "@/components/courses/course.modal";
import { useGetCourse } from "@/hooks/use-courses";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface CourseSchema {
  id: string;
  course_name: string;
  course_code: string;
  course_description:string
  duration: number;
  levels: Levels;
  created_at: string;
  demo_video_url?: string;
  category: string;
  max_students: number;
  is_free: boolean;
  price?: number;
  discount?: number;
  certificate_available: boolean;
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch } = useGetCourse();

  const filteredData = Array.isArray(data)
    ? data.filter(
        (course) =>
          course?.course_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          course?.course_code
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          course?.levels?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <p className="text-muted-foreground">Create and edit courses</p>
        </div>
        <AddCourseDialog refetch={refetch} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            Course List
            <Input
              placeholder="Search courses..."
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<CourseSchema>
            columns={columns}
            data={filteredData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
