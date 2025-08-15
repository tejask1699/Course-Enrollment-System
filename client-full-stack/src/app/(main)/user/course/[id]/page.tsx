"use client";

import { CourseEnrollment } from "@/components/courses/user/enrollment";
import { EnrollmentSkeleton } from "@/components/courses/user/skeleton";
import { useGetCourseById } from "@/hooks/use-courses";
import { useParams } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";

const EnrollmentPage = () => {
  const { id } = useParams();
  const courseId = typeof id === "string" ? id : "";
  const { data, isLoading } = useGetCourseById(courseId);

  if (isLoading) {
    return <EnrollmentSkeleton />;
  }

  if (!data) {
    return <p className="p-6 text-red-500">Course not found.</p>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{data.course_name}</h1>
        <p className="flex gap-6 text-muted-foreground">
          {data.course_code}
          <Badge variant="secondary">{data.levels}</Badge>
        </p>
      </div>

      {/* Enrollment Component */}
      <CourseEnrollment course={data} />
    </div>
  );
};

export default EnrollmentPage;
