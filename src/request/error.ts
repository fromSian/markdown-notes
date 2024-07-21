import axios from "axios";
import { toast } from "sonner";

export type CommonError = {
  message: string;
};

export function isCommonError(error: unknown): error is CommonError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

const convertToCommonError = (error: unknown): CommonError => {
  if (isCommonError(error)) {
    return error;
  }
  try {
    return new Error(JSON.stringify(error));
  } catch (error) {
    // 如果抛出的异常不是object
    return new Error(String(error));
  }
};

export const getErrorMessage = (error: unknown): string => {
  return convertToCommonError(error).message;
};

export const httpErrorHandler = (error: unknown) => {
  if (error === null) throw new Error("Unrecoverable error!! Error is null!");
  console.log(error);
  if (axios.isAxiosError(error)) {
    const response = error?.response;

    if (error.code === "ERR_NETWORK") {
      console.log("connection problems..");
    } else if (error.code === "ERR_CANCELED") {
      console.log("connection canceled..");
    }

    if (error.code === "ERR_BAD_RESPONSE") {
      toast.error("sorry, api is not working");
    }
    if (response && response.data) {
      if (response.status === 401) {
        toast.error("not valid log in, will sign out soon");
        // 401 Unauthorized
        // setTimeout(() => {
        //   sessionStorage.removeItem("token");
        //   window.location.href = "/welcome";
        // }, 3000);
      } else {
        toast.error(response.data.message);
      }
    }
  } else {
    console.log(error);
  }
  return Promise.reject(error);
};
