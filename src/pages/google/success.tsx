import SuccessIcon from "@/components/icons/success";
import Header from "@/components/welcome/header";
import { fetchUserInfo } from "@/request/account";
import { useAppDispatch } from "@/states/hooks";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(5);

  const timeRef = useRef<ReturnType<typeof setInterval>>();

  const checkToken = async (token: string) => {
    try {
      setLoading(true);
      const response = await fetchUserInfo(token);
      dispatch({
        type: "account/setAccount",
        payload: response,
      });
      sessionStorage.setItem("token", token);
    } catch (error) {
      navigate("/google/fail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("token");
    const token = searchParams.get("token");
    if (token) {
      checkToken(token);
      timeRef.current = setInterval(() => {
        setSeconds((v) => {
          if (v < 2) {
            clearInterval(timeRef.current);
            timeRef.current = undefined;
            navigate("/");
          }
          return v - 1;
        });
      }, 1000);
    } else {
      navigate("/google/fail");
    }

    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = undefined;
      }
    };
  }, []);
  const goHome = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = undefined;
    }
    navigate("/");
  };
  return (
    <>
      <Header />
      {false ? (
        <Loader
          className="animate-spin absolute"
          style={{
            top: "30%",
            left: "50%",
          }}
        />
      ) : (
        <div className="mt-8 flex flex-col gap-4 justify-center text-center items-center">
          <SuccessIcon className="w-16 h-16 mb-4" size={40} />
          <p>Congratulations! Log in successfully</p>
          <p>
            we will get you in after {seconds} seconds, or click here dive in
            right now
          </p>
          <button className="underline italic" onClick={goHome}>
            go to home page
          </button>
        </div>
      )}
    </>
  );
};

export default GoogleSuccess;
