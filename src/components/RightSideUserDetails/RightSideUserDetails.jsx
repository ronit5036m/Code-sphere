import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo";

export default function RightSideUserDetails() {
  const { CurrentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-80 text-lg text-gray-300">
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center space-x-5">
          <img
            src={CurrentUser?.existuser?.avatar || Logo.defaultUser}
            alt={CurrentUser?.existuser?.username}
            className="h-12 w-12 rounded-full object-cover cursor-pointer"
            onClick={() => navigate(`/profile/${CurrentUser?.existuser?._id}`)}
          />
          <div>
            <Link
              to={`/profile/${CurrentUser?.existuser?._id}`}
              className="font-semibold text-white"
            >
              {CurrentUser?.existuser?.name}
            </Link>
            <p className="text-neutral-400 text-lg">
              @{CurrentUser?.existuser?.username}
            </p>
          </div>
        </div>
        <Link
          to={`/profile/${CurrentUser?.existuser?._id}`}
          className="text-blue-500 text-lg font-semibold"
        >
          Visit
        </Link>
      </div>
      <Footer />
    </div>
  );
}
