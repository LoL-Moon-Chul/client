import axios, { AxiosInstance } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const createAxiosInstance = (baseURL: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // 요청 전에 실행되는 인터셉터
  instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('No access token found');
    // accessToken 헤더에 추가
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  // 응답을 받은 후 실행되는 인터셉터
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 403) {
        deleteCookie('lmc_asct');
        deleteCookie('lmc_rsct');
      }
      // 만료된 토큰에 대한 처리 (401 에러)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 새로운 accessToken 받기
        const newAccessToken = await refreshAccessToken().catch(async (err) => {
          if (err.response?.status === 403) {
            deleteCookie('lmc_asct');
            deleteCookie('lmc_rsct');
          }
        });

        // 새로 받은 토큰을 사용하여 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// 토큰 갱신
const refreshAccessToken = async () => {
  try {
    const refreshToken = getCookie('lmc_rsct');
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_LMC_API_URL}/token/public/reissue`, {
        refreshToken,
      })
      .then((res) => res.data);

    const newAccessToken = data.accessToken;

    setCookie('lmc_asct', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
};

const getAccessToken = () => {
  const accessToken = getCookie('lmc_asct');
  return accessToken;
};

export default createAxiosInstance;
