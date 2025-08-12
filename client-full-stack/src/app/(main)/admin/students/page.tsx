'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useGetStudents } from "@/hooks/use-students";
import { columns, StudentsData } from "@/components/students/columns";
import { DataTable } from "@/components/common/data-table";
import { Input } from "@/components/ui/input";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetStudents();

  const filteredData = Array.isArray(data)
    ? data.filter(
        (s) =>
          s?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">Manage enrolled students</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            Student List
            <Input
              placeholder="Search students..."
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<StudentsData>
            columns={columns}
            data={filteredData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
