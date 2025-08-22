export interface CourseSchema {
  id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  duration: number;
  levels: string;
  created_at: string;
  demo_video_url?: string;
  category: string;
  max_students: number;
  is_free: boolean;
  price?: number;
  discount?: number;
  certificate_available: boolean;
  enrolled?: boolean;
  chapters?: Chapter[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
  LessonProgress: LessonProgress[];
}

export interface Chapter {
  id: string;
  title: string;
  videoCount: number;
  totalDuration: string;
  lessons: Lesson[];
}
export interface LessonProgress {
  id: string;
  studentId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string;
}
