import { voteAPI } from '@/modules';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCheckVoteUser = (postId: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['checkVoteUser', postId],
    queryFn: () => voteAPI.checkVoteUser(postId),
  });

  const mutation = useMutation({
    mutationFn: () => voteAPI.checkVoteUser(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkVoteUser', postId] });
    },
  });

  return {
    data,
    mutation,
    isLoading,
    error,
  };
};
