import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="border sticky top-0 w-screen z-999 bg-black">
        <Link to="/" className="font-bold text-2xl flex items-center p-4">
          <span className="text-white">
            CodeSphere
          </span>
        </Link>
      </div>
    </>
  );
};

// bg-gradient-to-l from-pink-600 via-red-500 to-orange-400

export default Header;
