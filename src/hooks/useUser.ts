import { memberAPI } from "@/modules";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: memberAPI.getProfile,
  });

  const mutation = useMutation({
    mutationFn: memberAPI.getProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    user: data,
    mutation,
    isLoading,
    error,
  };
};
