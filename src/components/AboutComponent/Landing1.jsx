import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo";

function Landing1() {
  return (
    <main className="pt-16 pb-12 bg-black/90">
      <header>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to CodeSphere
        </h1>
        <h2 className="text-2xl text-center font-semibold mb-2 text-white">
          Build. Share. Connect. All in One Developer Platform.
        </h2>
        <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mt-4 mb-8">
          CodeSphere is a community-driven space where developers create
          stunning portfolios, showcase projects, and connect with like-minded
          minds.
        </p>
      </header>
      <div className="flex justify-center gap-4 mb-8">
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 text-black text-lg font-bold px-8 py-3 rounded-full shadow-lg transition"
        >
          Get Started
        </Link>
      </div>
      <div className="flex justify-center">
        <img
          className="rounded-2xl shadow-xl w-[800px] max-w-full border border-gray-800"
          src={Logo.code}
          alt="main code image"
        />
      </div>
      <hr className="my-12 border-gray-800 w-[90%] mx-auto" />
    </main>
  );
}
export default Landing1;
