import Logo from "./logo";

const Loader = () => {
  return (
    <>
      <img
        src={Logo.loading}
        alt="Loading..."
        className="animate-spin w-10 h-10 mt-20"
      />
    </>
  );
};

export default Loader;
