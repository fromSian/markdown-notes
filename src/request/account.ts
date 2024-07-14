import request from "./request";
export const fetchLogin = async (data: { email: string; password: string }) => {
  const url = "/account/login/";
  const response = await request.post(url, data);
  console.log(response);
  sessionStorage.setItem("token", response?.token);
};
