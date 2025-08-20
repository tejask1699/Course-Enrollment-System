"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle2,
  Trophy,
  Star,
  Target,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Chapter, CourseSchema } from "@/types/course-data";

interface CompletedLessons {
  [key: string]: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  requirement: number;
}

interface EnrolledCourseProps {
  course: CourseSchema;
}

const EnrolledCourse = ({ course }: EnrolledCourseProps) => {
  const chapters = course.chapters ?? [];

  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([chapters[0]?.id])
  );

  const [completedLessons, setCompletedLessons] = useState<CompletedLessons>(
    {}
  );
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-lesson",
      title: "Getting Started",
      description: "Complete your first lesson",
      icon: <Play className="h-4 w-4" />,
      unlocked: false,
      requirement: 1,
    },
    {
      id: "chapter-complete",
      title: "Chapter Master",
      description: "Complete an entire chapter",
      icon: <CheckCircle2 className="h-4 w-4" />,
      unlocked: false,
      requirement: 1,
    },
    {
      id: "halfway-hero",
      title: "Halfway Hero",
      description: "Complete 50% of all lessons",
      icon: <Target className="h-4 w-4" />,
      unlocked: false,
      requirement: 50,
    },
    {
      id: "course-champion",
      title: "Course Champion",
      description: "Complete all lessons in the course",
      icon: <Trophy className="h-4 w-4" />,
      unlocked: false,
      requirement: 100,
    },
  ]);

  // Calculate progress statistics
  const totalLessons = chapters.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  );
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Check for new achievements
  useEffect(() => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        let shouldUnlock = false;

        switch (achievement.id) {
          case "first-lesson":
            shouldUnlock = completedCount >= 1;
            break;
          case "chapter-complete":
            shouldUnlock = chapters.some((chapter) =>
              chapter.lessons.every((lesson) => completedLessons[lesson.id])
            );
            break;
          case "halfway-hero":
            shouldUnlock = progressPercentage >= 50;
            break;
          case "course-champion":
            shouldUnlock = progressPercentage === 100;
            break;
        }

        return { ...achievement, unlocked: shouldUnlock };
      })
    );
  }, [completedLessons, completedCount, progressPercentage, chapters]);

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const getChapterProgress = (chapter: Chapter) => {
    const completedInChapter = chapter.lessons.filter(
      (lesson) => completedLessons[lesson.id]
    ).length;
    return Math.round((completedInChapter / chapter.lessons.length) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with Progress */}
      <div className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{course.course_name}</h1>
              <p className="text-muted-foreground">
                {course.course_description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {progressPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {completedCount} of {totalLessons} lessons completed
              </span>
              <span>
                {achievements.filter((a) => a.unlocked).length} achievements
                unlocked
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      {achievements.some((a) => a.unlocked) && (
        <div className="px-6 py-4 border-b bg-muted/20">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
          </h3>
          <div className="flex gap-2 flex-wrap">
            {achievements
              .filter((a) => a.unlocked)
              .map((achievement) => (
                <Badge
                  key={achievement.id}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {achievement.icon}
                  {achievement.title}
                </Badge>
              ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Course Content</h3>
          </div>

          <div className="space-y-2">
            {chapters.map((chapter) => {
              const chapterProgress = getChapterProgress(chapter);
              const isChapterComplete = chapterProgress === 100;

              return (
                <Card key={chapter.id} className="border">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{chapter.title}</h4>
                        {isChapterComplete && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {chapter.videoCount} Videos • {chapter.totalDuration}
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={chapterProgress}
                          className="h-1 flex-1"
                        />
                        <span className="text-xs text-muted-foreground min-w-[3rem]">
                          {chapterProgress}%
                        </span>
                      </div>
                    </div>
                    {expandedChapters.has(chapter.id) ? (
                      <ChevronUp className="h-4 w-4 ml-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-4" />
                    )}
                  </div>

                  {expandedChapters.has(chapter.id) && (
                    <div className="border-t">
                      {chapter.lessons.map((lesson) => {
                        const isCompleted = completedLessons[lesson.id];

                        return (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors ${
                              isCompleted
                                ? "bg-green-50 dark:bg-green-950/20"
                                : ""
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto"
                                onClick={() =>
                                  toggleLessonCompletion(lesson.id)
                                }
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Play className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                              <span
                                className={`text-sm ${
                                  isCompleted
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }`}
                              >
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
                        );
                      })}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Upcoming Achievements */}
          {achievements.some((a) => !a.unlocked) && (
            <Card className="mt-6 p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Upcoming Achievements
              </h4>
              <div className="space-y-2">
                {achievements
                  .filter((a) => !a.unlocked)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                    >
                      <div className="text-muted-foreground">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
