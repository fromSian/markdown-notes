import { useAppSelector } from "@/states/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const { isLogin } = useAppSelector((state) => state.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/welcome");
    } else {
      navigate("/notes");
    }
  }, [isLogin]);
};

export default Home;
