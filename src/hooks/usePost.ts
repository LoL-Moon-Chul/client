import { useInfiniteQuery } from "@tanstack/react-query";
import { postAPI } from "@/modules";

export const usePost = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      postAPI.getPostList({
        page: pageParam,
        size: 10,
        sort: "createdAt,desc",
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.totalPages > pages.length ? pages.length : undefined,
  });

  return {
    data: data?.pages.map((page) => page.postResponses).flat() || [],
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};
