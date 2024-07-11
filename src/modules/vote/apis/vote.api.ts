import createAxiosInstance from '@/utils/axiosInstance';
import axios from 'axios';
import { ResponseCheckVoteUser, ResponseVote, Vote } from '@/modules';

const apiUrl = process.env.NEXT_PUBLIC_LMC_API_URL;

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_LMC_API_URL}/votes`,
);

export const voteAPI = {
  vote: (data: Vote) =>
    axiosInstance.post<ResponseVote>('/private', data).then((res) => res.data),
  checkVoteUser: (postId: number) =>
    axiosInstance
      .get<ResponseCheckVoteUser>(`/private/check/posts/${postId}`)
      .then((res) => res.data),
};
