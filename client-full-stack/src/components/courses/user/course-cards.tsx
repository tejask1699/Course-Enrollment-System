"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Clock, Users } from "lucide-react";
import { useGetStudentCourse } from "@/hooks/use-courses";
import { useRouter } from "next/navigation";

const CourseCard = () => {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userID");
    if (id) setStudentId(id);
  }, []);
  const { data } = useGetStudentCourse(studentId);

  const filteredCourses = Array.isArray(data)
    ? data.filter(
        (course) =>
          course.course_name.toLowerCase().includes(search.toLowerCase()) ||
          course.course_description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <p className="text-muted-foreground">
          Browse and enroll in available courses
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search courses..."
          className="pl-10"
        />
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge
                    className={
                      course.levels === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : course.levels === "Intermediate"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {course.levels}
                  </Badge>
                  {new Date(course.created_at) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{course.course_name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {course.course_description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} weeks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.max_students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>
                {course.enrolled ? (
                  <Button 
                  className="w-full"
                  onClick={() => router.push(`/user/course/${course.id}?enrolled=${course.enrolled}`)}
                  >
                    Enrolled
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => router.push(`/user/course/${course.id}?enrolled=${course.enrolled}`)}
                  >
                    {course.is_free
                      ? "Enroll Now"
                      : `Enroll Now - ₹${course.price}${
                          course.discount ? ` (-${course.discount}%)` : ""
                        }`}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
