import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  headers: sessionStorage.getItem("token")
    ? {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    : {},
});

export default request;
