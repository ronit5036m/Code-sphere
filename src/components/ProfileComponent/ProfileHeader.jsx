import Logo from "../../assets/logo";
import "../../App.css";
import {
  Settings,
  EllipsisVertical,
  Dot,
  ArrowLeft,
  LogOut,
  User,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useMedia } from "../../Context/ResponsiveContext";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import TimelineFeed from "./TimelineFeed";

const ProfileComponent = ({ profile, isCurrentUser, projects }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobileSize = useMedia();
  const [isElipsDialogOpen, setIsElipsDialogOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successfully");
    window.location.reload();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsElipsDialogOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-3xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      {isMobileSize && history.length > 0 && (
        <nav
          className={`sticky top-0 flex items-center h-15 w-full backdrop-blur-lg bg-black/20 rounded-xl p-6`}
        >
          <ArrowLeft
            size={28}
            color="#fff"
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />
        </nav>
      )}
      {/* bg-gradient-to-l from-pink-600 via-red-500 to-orange-400 */}
      <div className={`bg-black ${isMobileSize ? "py-5 px-5" : "py-10"}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 ">
            <div className="w-25 h-25 rounded-full shadow-md overflow-hidden p-1">
              <img
                src={profile?.avatar || Logo.defaultUser}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{profile?.name}</h1>
              <p className="text-white opacity-90">@ Devloper</p>
            </div>
          </div>

          {/* Ellips Button / Dropdown */}

          <div className="relative" ref={menuRef}>
            <button
              className="text-white hover:text-gray-200 cursor-pointer"
              onClick={() => setIsElipsDialogOpen((prev) => !prev)}
            >
              <EllipsisVertical size={24} />
            </button>

            {/* Dropdown Panel (below the three dots) */}
            {isElipsDialogOpen && (
              <div className="absolute right-0 mt-2 bg-neutral-700 rounded-xl shadow-lg w-44 py-2 z-50">
                <ul className="flex flex-col text-sm">
                  <li>
                    <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-neutral-500">
                      <Settings size={16} /> Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-400 font-bold hover:bg-neutral-500"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Profile Info */}
      <div className="px-5">
        <div className="flex justify-between m-5">
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-bold">
              {profile?.projects?.length || 0}
            </p>
            <p className="text-gray-500">posts</p>
          </div>
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-bold">
              {profile?.followers?.length || 0}
            </p>
            <p className="text-gray-500">followers</p>
          </div>
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-bold">
              {profile?.following?.length || 0}
            </p>
            <p className="text-gray-500">following</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-300 mb-1">
            @{profile?.username}
          </h2>
          {profile?.bio && (
            <p className="text-neutral-300 mb-2">{profile?.bio}</p>
          )}
          <div>
            {profile?.address && (
              <p className="font-medium flex">
                From <Dot /> {profile?.address}
              </p>
            )}
            {profile?.phone && (
              <p className="font-medium flex">
                Contact <Dot /> {profile?.phone}
              </p>
            )}
            {profile?.skills?.length > 0 && (
              <div className="font-medium flex">
                Skills
                <Dot />
                <p className="font-medium">{profile.skills.join(", ")}</p>
              </div>
            )}

            {profile?.links && (
              <div className="font-medium gap-3">
                {Object.entries(profile?.links || {})
                  .filter(([_, url]) => url) // keep only non-empty values
                  .map(([platform, url], i) => (
                    <p key={i} className="font-medium">
                      {platform} :{" "}
                      <a
                        href={url.startsWith("http") ? url : `https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {url}
                      </a>
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
        {/* bg-gradient-to-l from-pink-600 via-red-500 to-orange-400 */}
        <div>
          {isCurrentUser ? (
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => navigate(`/edit-profile`)}
                className="flex-1 bg-white p-1 text-black py-2 px-4 rounded-lg font-bold hover:bg-white/85 transition text-center cursor-pointer"
              >
                Edit profile
              </button>
              <button className="flex-1 bg-neutral-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-neutral-800 transition text-center">
                View archive
              </button>
            </div>
          ) : (
            <div className="flex space-x-4 mb-6">
              <button className="flex-1 bg-white p-1 text-black py-2 px-4 rounded-lg font-bold hover:opacity-90 transition">
                Follow
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Feed section */}
      <TimelineFeed projects={projects} />
    </div>
  );
};

export default ProfileComponent;
