import { apiClient } from "@/lib/api-routes";
import { useQuery } from "@tanstack/react-query";

export const useGetStudents = () => {
  return useQuery({
    queryKey: ["get-students"],
    queryFn: () => apiClient.getStudents(),
  });
};
