import Fail from "@/components/icons/fail";
import Header from "@/components/introduce/header";

const GoogleFail = () => {
  return (
    <>
      <Header />
      <div className="flex mt-8 flex-col gap-2 justify-center items-center">
        <Fail
          className="w-16 h-16 mb-4"
          style={{
            fontSize: 40,
          }}
        />
        <p>Sorry, log in with Google failed.</p>
        <p>Please try again or get in by other methods.</p>
      </div>
    </>
  );
};

export default GoogleFail;
