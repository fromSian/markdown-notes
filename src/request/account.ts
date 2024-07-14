import request from "./request";
export const fetchLogin = async (data: { email: string; password: string }) => {
  const url = "/account/login/";
  const response = await request.post(url, data);
  console.log(response);
  sessionStorage.setItem("token", response?.token);
};

export const fetchUserInfo = async (token = "") => {
  const url = "/account/info/";
  const response = await request.get(
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
