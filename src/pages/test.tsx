const test = () => {
  return (
    <div className="overflow-scroll h-40 border">
      <textarea
        onChange={(e) => {
          console.log(e.target.value);
          const value = e.target.value;
          const t = value.replace(/\r?\n/g, "");
          console.log(t);
          e.target.value = t;
        }}
      />
    </div>
  );
};

export default test;
