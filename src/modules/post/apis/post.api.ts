import axios from "axios";
import createAxiosInstance from "@/utils/axiosInstance";
import { WritePost } from "@/modules";

const apiUrl = process.env.NEXT_PUBLIC_LMC_API_URL;

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_LMC_API_URL}/posts`
);

export const postAPI = {
  getProfile: (data: WritePost) =>
    axiosInstance.post("/private", data).then((res) => res.data),
};
