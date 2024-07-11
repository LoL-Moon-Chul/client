import axios from 'axios';
import createAxiosInstance from '@/utils/axiosInstance';
import { ResponsePost, WritePost } from '@/modules';

const apiUrl = `${process.env.NEXT_PUBLIC_LMC_API_URL}/posts`;

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_LMC_API_URL}/posts`,
);

export const postAPI = {
  writePost: (data: WritePost) =>
    axiosInstance.post('/private', data).then((res) => res.data),
  getPostList: (filter: { page: number; size: number; sort: string }) =>
    axios
      .get<{
        postResponses: ResponsePost[];
        totalElements: number;
        totalPages: number;
      }>(`${apiUrl}/public`, { params: filter })
      .then((res) => res.data),
  getPostDetail: (postId: number) =>
    axios
      .get<ResponsePost>(`${apiUrl}/public/${postId}`)
      .then((res) => res.data),
};
