import Fail from "@/components/icons/fail";
import { Loader } from "lucide-react";
import { useState } from "react";

const Success = ({ goSomeWhereElse, handleLogin }) => {
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const login = async () => {
    try {
      setLoading(true);
      setFail(false);
      await handleLogin();
    } catch (error) {
      setFail(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      <p>congratulations! sign up successfully</p>

      <button
        disabled={loading}
        className="black_btn flex gap-2 items-center"
        onClick={login}
      >
        {loading && <Loader size={20} className="animate-spin" />}
        {fail && <Fail />}
        log in directly
      </button>
      <button className="black_btn" onClick={goSomeWhereElse}>
        go somewhere else
      </button>
    </div>
  );
};

export default Success;
