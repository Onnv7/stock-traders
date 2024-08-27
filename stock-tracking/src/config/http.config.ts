import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api`; // ${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api // http://api-gateway-production-ca23.up.railway.app/api

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const httpAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const setAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    httpAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
setAuthToken();

httpAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Gọi API để refresh token
        const response = await http.post(
          '/auth/refresh-token',
          {},
          {
            withCredentials: true, // Đảm bảo gửi cookie chứa refreshToken
          },
        );

        const newAccessToken = response.data.accessToken;

        // Cập nhật lại access token trong headers
        httpAuth.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Thực hiện lại yêu cầu ban đầu
        return httpAuth(originalRequest);
      } catch (refreshError) {
        // Xử lý lỗi khi refresh token thất bại (ví dụ: đăng xuất người dùng)
        console.error('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
