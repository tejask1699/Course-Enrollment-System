'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/common/data-table"
import { columns } from "@/components/courses/columns"
import { AddCourseDialog, CourseSchema } from "@/components/courses/course.modal"
import { useGetCourse } from "@/hooks/use-courses"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function CoursesPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const { data } = useGetCourse()


  const filteredData = Array.isArray(data)
    ? data.filter((course) =>
      course?.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.levels?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <p className="text-muted-foreground">Create and edit courses</p>
        </div>
        <AddCourseDialog />
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
  )
}
