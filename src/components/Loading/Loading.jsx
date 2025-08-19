import React from "react";

const AppLoading = () => {
  return (
    <>
      <div className="h-screen bg-black z-999 flex justify-center items-center overflow-y-hidden">
        <div className="flex items-center justify-center">
          <style>{`
        @keyframes gradient-waves {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

          <h1
            className="text-5xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text select-none"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #db2777, #ef4444, #f97316, #facc15, #22c55e, #3b82f6, #8b5cf6, #ec4899, #db2777)",
              backgroundSize: "1000% 100%",
              animation: "gradient-waves 3s ease-in-out infinite",
            }}
          >
            Code Sphere
          </h1>
        </div>
      </div>
    </>
  );
};

export default AppLoading;
