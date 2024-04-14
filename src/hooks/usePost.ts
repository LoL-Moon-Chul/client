import { postAPI } from "@/modules";
import {
  useQueryClient,
  useQuery,
  useMutation,
  keepPreviousData,
} from "@tanstack/react-query";

export const usePost = (filter: {
  page: number;
  size: number;
  sort: string;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", filter],
    queryFn: () => postAPI.getPostList(filter),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: () => postAPI.getPostList(filter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", filter] });
    },
  });

  return {
    data: data?.postResponses,
    totalElements: data?.totalElements,
    totalPages: data?.totalPages,
    isLoading,
    error,
    mutation,
  };
};
