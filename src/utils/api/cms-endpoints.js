import axios, { AxiosError } from "axios";
import cmsPrivateRequest, { CMS_BASE_URL } from "../cms-axios-utils";

export const cmsLoginApi = async (payload) => {
  try {
    const res = await axios.post(`${CMS_BASE_URL}/auth/login`, payload);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const cmsGetPublicationTypes = async () => {
  try {
    const res = await axios.get(`${CMS_BASE_URL}/publications/type/public`);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const cmsPublicationPost = async (payload) => {
  try {
    const res = await cmsPrivateRequest.post(`/publications/`, payload);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const cmsNewsPost = async (payload) => {
  try {
    const res = await cmsPrivateRequest.post(`/news/`, payload);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const cmsEventsPost = async (payload) => {
  try {
    const res = await cmsPrivateRequest.post(`/events/`, payload);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
