"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, BookOpen } from "lucide-react";
import { useGetStudentCourse } from "@/hooks/use-courses";
import { useEffect, useState } from "react";

export default function StudyMaterialsPage() {
  const [studentId, setStudentId] = useState("");
  
  useEffect(() => {
    const id = localStorage.getItem("userID");
    if (id) setStudentId(id);
  }, []);

  const { data } = useGetStudentCourse(studentId);

  const filterData = Array.isArray(data)
    ? data.filter((value) => value.enrolled === true)
    : [];

  console.log(filterData);

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <p className="text-muted-foreground">
            Notes, resources, and downloads
          </p>
        </div>
      </div>

      {/* Material Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {filterData.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Notes - {course.course_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.notes.map((note:any) => (
                <div key={note.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{note.value}</h4>
                      <p className="text-sm text-muted-foreground">
                        Description for {note.value} goes here
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Materials */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Recently Added</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Advanced React Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Higher-order components and render props
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">New</Badge>
                <Button size="sm">View</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">JavaScript ES6+ Features</h4>
                  <p className="text-sm text-muted-foreground">
                    Modern JavaScript syntax and features
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added 1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Updated</Badge>
                <Button size="sm">View</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
