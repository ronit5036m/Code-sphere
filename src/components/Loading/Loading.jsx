import Logo from "../../assets/logo";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-white overflow-y-hidden overflow-x-hidden gap-8">
      {/* Logo */}
      {/* <img
        src={Logo.codeSphereLogo}
        alt="Product Logo"
        className="w-30 md:w-30 rounded-full mb-6"
      /> */}
      <div className="font-bold font-mono text-4xl">CodeSphere</div>

      {/* Three Blinking Dots */}
      <div className="flex gap-x-1.5 h-4 w-15">
        <span className="bg-white rounded-full animate-bounce"></span>
        <span
          className="bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </div>
  );
};

export default LoadingPage;
