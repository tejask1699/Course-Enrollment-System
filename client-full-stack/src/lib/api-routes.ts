
import { AddCourseSchema } from "@/components/courses/course.modal";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


interface AxiosOptions {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    body?: Record<string, string | number>;
    headers?: Record<string, string>;
    responseType?: 'arraybuffer' | 'blob' | 'documnent' | 'json' | 'text' | 'stream';
}

class ApiClient {
    private static instance: ApiClient;
    private baseURL = process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_URL

    private constructor() { }
    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance
    }

    private async request<T>(
        endpoint: string,
        options: AxiosOptions = {}
    ): Promise<T> {
        const { method = 'get', body, headers = {} } = options;
        const config: AxiosRequestConfig = {
            url: `${endpoint}`,
            method,
            baseURL: this.baseURL,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            data: body || undefined
        }
        const response: AxiosResponse<T> = await axios(config);
        return response.data
    }

    async createCourse(
        data: AddCourseSchema,
    ): Promise<AddCourseSchema> {
        return this.request(
            `/api/courses`,
            {
                method: "post",
                body: data,
            }
        )
    }

    async getCourse() {
        return this.request(
            `/api/courses`,
            { method: "get", }
        )
    }

}

export const apiClient = ApiClient.getInstance()
