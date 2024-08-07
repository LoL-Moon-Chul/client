import createAxiosInstance from '@/utils/axiosInstance';
import { ResponseUser } from '@/modules';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_LMC_API_URL;

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_LMC_API_URL}/members`,
);

export const memberAPI = {
  login: (code: string) =>
    axios
      .post<{
        accessToken: string;
        refreshTokens: string;
      }>(`${apiUrl}/auth/oauth/kakao/login?code=${code}`)
      .then((res) => res.data),
  getProfile: () =>
    axiosInstance.get<ResponseUser>('/private').then((res) => res.data),
};
