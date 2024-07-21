import { Account, Settings } from "@/types/account";
import request from "./request";
export const fetchLogin = async (data: { email: string; password: string }) => {
  const url = "/account/login/";
  const response: Account & Settings = await request.post(url, data);
  sessionStorage.setItem("token", response?.token);
  return response;
};

export const fetchUserInfo = async (token = "") => {
  const url = "/account/info/";
  const response: Account & Settings = await request.get(
    url,
    token
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : {}
  );
  return response;
};

export const goGoogleAuth = () => {
  const url = "http://localhost:8000/account/google/access/";
  window.open(url, "_self");
};

export const fetchTrial = async () => {
  const url = "/account/trial/";
  const response: Account & Settings = await request.post(url);
  sessionStorage.setItem("token", response?.token);
  return response;
};
