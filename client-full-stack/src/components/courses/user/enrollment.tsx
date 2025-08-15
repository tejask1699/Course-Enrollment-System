"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Heart,
  BarChart3,
} from "lucide-react";
import { chapters } from "@/types/course-data";
import { CourseSchema } from "@/app/(main)/admin/courses/page";
import { useEnrollCourse } from "@/hooks/use-courses";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  videoCount: number;
  totalDuration: string;
  lessons: Lesson[];
}

interface CourseCurriculumModalProps {
  course: CourseSchema | undefined;
}

export const CourseEnrollment = ({ course }: CourseCurriculumModalProps) => {
  if (!course) return;

  const adaptedCourse = {
    ...course,
    price: course.is_free ? 0 : course.price ?? 0,
    originalPrice: course.discount
      ? (course.price ?? 0) + course.discount
      : null,
    totalSections: chapters.length,
    totalLectures: chapters.reduce((acc, c) => acc + c.lessons.length, 0),
    totalDuration: `${course.duration ?? 0}h 00m`,
  };

  const [activeTab, setActiveTab] = useState<
    "curriculum" | "description" | "reviews"
  >("curriculum");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([chapters[0]?.id])
  );

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const discountPercentage = adaptedCourse.originalPrice
    ? Math.round(
        ((adaptedCourse.originalPrice - adaptedCourse.price) /
          adaptedCourse.originalPrice) *
          100
      )
    : 0;

  const { mutate } = useEnrollCourse();

  const handleEnrollment = () => {
    const studentId = localStorage.getItem("id") || "";
    const courseId = course.id;

    mutate(
      { data: { studentId, courseId } }, // matches CreateEnrollCourse
      {
        onSuccess: () => {
          console.log("Enrolled successfully");
        },
        onError: (error) => {
          console.error("Enrollment failed", error);
        },
      }
    );
  };
  return (
    <div className="grid grid-cols-2 h-full">
      {/* Left Panel - Course Content */}
      <div className="flex flex-col">
        {/* Tabs */}
        <div className="border-b bg-background px-6 py-4">
          <div className="flex space-x-8">
            {["curriculum", "description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === "curriculum" && (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Course Content</h3>
                <p className="text-sm text-muted-foreground">
                  {adaptedCourse.totalSections} sections •{" "}
                  {adaptedCourse.totalLectures} lectures •{" "}
                  {adaptedCourse.totalDuration} total length
                </p>
              </div>

              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <Card key={chapter.id} className="border">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{chapter.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {chapter.videoCount} Videos • {chapter.totalDuration}
                        </p>
                      </div>
                      {expandedChapters.has(chapter.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>

                    {expandedChapters.has(chapter.id) && (
                      <div className="border-t">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-4 py-3 hover:bg-muted/30"
                          >
                            <div className="flex items-center space-x-3">
                              <Play className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {lesson.title}
                                {lesson.isPreview && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                  >
                                    Preview
                                  </Badge>
                                )}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "description" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Description</h3>
              <p className="text-muted-foreground">
                {adaptedCourse.course_description ??
                  "No description available."}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Student Reviews</h3>
              <p className="text-muted-foreground">
                Reviews and ratings from students who have taken this course.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Course Preview & Purchase */}
      <div className=" border-l bg-muted/20">
        <div className="p-6 space-y-6">
          {/* Video Preview */}
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/20"
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">
                US${adaptedCourse.price}
              </span>
              {adaptedCourse.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    US${adaptedCourse.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700"
                onClick={handleEnrollment}
              >
                Buy now
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Add to wishlist
              </Button>
            </div>
          </div>

          {/* Course Stats */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {adaptedCourse.totalSections} sections
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Play className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {adaptedCourse.totalLectures} lectures
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {adaptedCourse.totalDuration} total length
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
