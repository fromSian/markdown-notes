import Sign from "./sign";

const Index = () => {
  return (
    <>
      <div className="w-full flex gap-4 mt-8 items-center">
        <div
          className="bg-slate-400"
          style={{ width: "50%", height: 600 }}
        ></div>
        <Sign />
      </div>
      <div className="mt-4 text-center">emial: notetodo@163.com</div>
    </>
  );
};

export default Index;
