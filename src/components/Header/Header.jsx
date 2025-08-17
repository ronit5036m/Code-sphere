import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="border sticky top-0 w-screen z-999 bg-black">
        <h1 className="text-white font-bold text-2xl flex items-center p-4 font-mono">
          <Link to="/">CodeSphere</Link>
        </h1>
      </div>
    </>
  );
};

export default Header;
