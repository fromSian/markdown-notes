import SuccessIcon from "../icons/success";

const features = [
  "markdown you can write markdown",
  "trial it ",
  "custom your theme",
  "could export markdown",
];

const Feature = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <p className="text-3xl font-bold text-center sm:text-left">
        create you own markdown note right now
      </p>

      <p className="text-tsecondary hidden sm:block ">
        feel right about this may help you maintain you minds writ more ad writ
        more ad writ more ad writ more ad writ more ad writ more ad writ more ad
        writ more ad writ more ad writ more ad writ more ad writ more ad writ
        more ad writ more ad writ more ad writ more ad writ more ad writ more ad
        writ more ad writ more ad writ more ad writ more ad writ more ad writ
        more ad writ more ad writ more ad writ more ad writ more ad writ more ad
        writ more ad
      </p>

      <p className="text-ttertiary italic hidden sm:block">our features</p>

      <ul className="pl-4 sm:flex-col gap-4 hidden sm:flex">
        {features.map((item) => (
          <li key={item} className="flex gap-2 items-center ">
            <SuccessIcon />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feature;
