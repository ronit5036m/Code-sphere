import Logo from "../../assets/logo";

const LoadingPage = () => {
  return (
    //       <div className="h-screen bg-black z-999 flex justify-center items-center overflow-y-hidden">
    //         <div className="flex items-center justify-center">
    //           <style>{`
    //         @keyframes gradient-waves {
    //           0% { background-position: 0% 50%; }
    //           50% { background-position: 100% 50%; }
    //           100% { background-position: 0% 50%; }
    //         }
    //       `}</style>

    //           <h1
    //             className="text-5xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text select-none"
    //             style={{
    //               backgroundImage:
    //                 "linear-gradient(270deg, #db2777, #ef4444, #f97316, #facc15, #22c55e, #3b82f6, #8b5cf6, #ec4899, #db2777)",
    //               backgroundSize: "1000% 100%",
    //               animation: "gradient-waves 3s ease-in-out infinite",
    //             }}
    //           >
    //             Code Sphere
    //           </h1>
    //         </div>
    //       </div>

    <div className="h-screen w-full flex flex-col justify-center items-center  text-white">
      {/* Logo */}
      <img
        src={Logo.codeSphereLogo}
        alt="Product Logo"
        className="w-30 md:w-30 rounded-full mb-6"
      />

      {/* Three Blinking Dots */}
      <div className="flex gap-x-1.5 h-5 w-15">
        <span className="bg-gradient-to-l from-pink-600 via-red-500 to-orange-400  rounded-full animate-bounce"></span>
        <span
          className="bg-gradient-to-l from-pink-600 via-red-500 to-orange-400  rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="bg-gradient-to-l from-pink-600 via-red-500 to-orange-400  rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </div>
  );
};

export default LoadingPage;
