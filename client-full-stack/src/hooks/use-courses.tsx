import { AddCourseSchema } from "@/components/courses/course.modal";
import { apiClient } from "@/lib/api-routes";
import { EnrollCourse } from "@/types/course-interface";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";

type CreateCourseVariable = {
  data: AddCourseSchema;
};

export const useCreateCourse = (): UseMutationResult<
  AddCourseSchema,
  Error,
  CreateCourseVariable
> => {
  return useMutation<AddCourseSchema, Error, CreateCourseVariable>({
    mutationFn: ({ data }) => apiClient.createCourse(data),
  });
};

export const useGetCourse = () => {
  return useQuery({
    queryKey: ["get-courses"],
    queryFn: () => apiClient.getCourse(),
  });
};

export const useGetCourseById = (courseId: string) => {
  return useQuery({
    queryKey: ["get-on-course"],
    queryFn: () => apiClient.getCourseById(courseId),
  });
};

//Enroll Course

type CreateEnrollCourse = {
  data: EnrollCourse;
};

export const useGetStudentCourse = (studentId:string) => {
  return useQuery({
    queryKey: ["get-student-courses"],
    queryFn: () => apiClient.getStudentCourse(studentId),
  });
};

export const useEnrollCourse = (): UseMutationResult<
  EnrollCourse,
  Error,
  CreateEnrollCourse
> => {
  return useMutation<EnrollCourse, Error, CreateEnrollCourse>({
    mutationFn: ({ data }) => apiClient.enrollCourse(data),
  });
};
