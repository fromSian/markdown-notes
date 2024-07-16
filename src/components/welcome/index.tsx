import Feature from "./feature";
import Sign from "./sign";
/**
 *
 * light 70, 89, 111
 *
 * dark 29, 46, 67
 *
 * gray 121, 124, 136
 *
 *
 */
const Index = () => {
  return (
    <>
      <div
        className="w-full flex gap-4 sm:gap-6 flex-col  sm:flex-row mt-0 sm:mt-8 px-2 gap:px-4"
        style={{
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <div className="block sm:hidden w-full">
          <Feature />
        </div>
        <div
          className="hidden sm:block h-full rounded-md bg-welcome flex-1"
          style={{
            minHeight: "calc(100vh - 200px)",
          }}
        >
          <Feature />
        </div>
        <Sign />
      </div>
      <div className="mt-4 text-center text-ttertiary opacity-50">
        contact info:
        <a href="mailto:notetodos@163.com" className=" underline mx-2">
          notetodos@163.com
        </a>
      </div>
    </>
  );
};

export default Index;
