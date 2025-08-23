
import { AddCourseSchema } from "@/components/courses/course.modal";
import { StudentsData } from "@/components/students/columns";
import { CourseSchema } from "@/types/course-data";
import { EnrollCourse, lessonProgessSchema, SubmitTestSchema } from "@/types/course-interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { boolean, string } from "zod";

interface AxiosOptions {
  method?: "get" | "post" | "put" | "delete" | "patch";
  body?: Record<string, string | number> | unknown;
  headers?: Record<string, string>;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "documnent"
    | "json"
    | "text"
    | "stream";
}

class ApiClient {
  private static instance: ApiClient;
  private baseURL = process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_URL;

  private constructor() {}
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private async request<T>(
    endpoint: string,
    options: AxiosOptions = {}
  ): Promise<T> {
    const { method = "get", body, headers = {} } = options;
    const config: AxiosRequestConfig = {
      url: `${endpoint}`,
      method,
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body || undefined,
    };
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  }

  async createCourse(data: AddCourseSchema): Promise<AddCourseSchema> {
    return this.request(`/api/courses`, {
      method: "post",
      body: data,
    });
  }

  async getCourse(): Promise<CourseSchema> {
    return this.request(`/api/courses`, { method: "get" });
  }

  async getCourseById(courseId: string): Promise<CourseSchema> {
    return this.request(`/api/courses/${courseId}`, { method: "get" });
  }

  async getStudents(): Promise<StudentsData> {
    return this.request(`/api/students`, { method: "get" });
  }

  //enroll course

  async getStudentCourse(studentId: string): Promise<CourseSchema> {
    return this.request(`/api/student-course?studentId=${studentId}`, {
      method: "get",
    });
  }
  async enrollCourse(data: EnrollCourse): Promise<EnrollCourse> {
    return this.request(`/api/assign-courses`, {
      method: "post",
      body: data,
    });
  }

  
  //lesson Progress
  async lessonProgress(data: lessonProgessSchema): Promise<lessonProgessSchema> {
    return this.request(`/api/lesson-progress`, {
      method: "post",
      body: data,
    });
  }

  //test
   async submitTest(data: SubmitTestSchema): Promise<SubmitTestSchema> {
    return this.request(`/api/lesson-progress`, {
      method: "post",
      body: data,
    });
  }
}

export const apiClient = ApiClient.getInstance();
