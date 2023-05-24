import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useCmsAuthStore } from "../zustand/cms-store";

export const CMS_BASE_URL = "https://web-production-9688.up.railway.app/api";

const cmsPrivateRequest = axios.create({
  baseURL: CMS_BASE_URL,
});

cmsPrivateRequest.interceptors.request.use(async (config) => {
  const userData = useCmsAuthStore.getState().user;
  const deleteUserHandler = useCmsAuthStore.getState().delUser;
  const setUserHandler = useCmsAuthStore.getState().setUser;

  config.headers.set("Authorization", `Bearer ${userData?.token.access}`);

  const access_decoded = jwtDecode(userData?.token.access);
  const isExpired = dayjs.unix(access_decoded.exp).diff(dayjs()) < 1;

  if (!isExpired) return config;

  try {
    const response = await axios.post(`${CMS_BASE_URL}/auth/token/refresh/`, {
      refresh: userData?.token.refresh,
    });

    if (userData) {
      userData.token.access = response.data.access;

      setUserHandler(userData);
    }

    config.headers.set("Authorization", `Bearer ${response.data.access}`);
  } catch (err) {
    const error = err;
    if (error.response?.status === 401) {
      deleteUserHandler();
    }
  }

  return config;
});

export default cmsPrivateRequest;
