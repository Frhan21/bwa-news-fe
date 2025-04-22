import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
// import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export function SetupInerceptor() {
  //   const router = useRouter();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = getCookie("AccessToken");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        deleteCookie("AccessToken");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
