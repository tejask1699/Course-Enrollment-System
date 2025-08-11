import { AddCourseSchema } from "@/components/courses/course.modal"
import { apiClient } from "@/lib/api-routes"
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query"

type CreateCourseVariable = {
    data: AddCourseSchema
}

export const useCreateCourse = (): UseMutationResult<AddCourseSchema, Error, CreateCourseVariable> => {
    return useMutation<AddCourseSchema, Error, CreateCourseVariable>({
        mutationFn: ({ data }) =>
            apiClient.createCourse(data)
    })
}

export const useGetCourse = () => {
    return useQuery({
        queryKey: ['get-courses'],
        queryFn: () => apiClient.getCourse()
    })
}
