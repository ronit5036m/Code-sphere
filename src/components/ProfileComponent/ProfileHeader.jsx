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
import axiosInstance from "../../api/axiosInstance";

const ProfileComponent = ({ profile, isCurrentUser, projects }) => {
  const { logout, authToken } = useAuth();
  const navigate = useNavigate();
  const isMobileSize = useMedia();
  const [isElipsDialogOpen, setIsElipsDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing);
  const menuRef = useRef(null);

  const [countFollowers, setCountFollowers] = useState(
    profile?.followers.length || 0
  );

  const [countFollowing, setCountFollowing] = useState(
    profile?.following.length || 0
  );

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successfully");
    window.location.reload();
    navigate("/login");
  };

  const handleFollowing = () => {
    setIsFollowing((prev) => !prev);
    axiosInstance
      .post(
        `/api/${profile?._id}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then(() => {
        toast.success(
          !isFollowing
            ? `You started following ${profile?.name}`
            : `You unfollow ${profile?.name}`
        );
      })
      .catch(() => {
        setIsFollowing((prev) => !prev);
        toast.error("Something went wrong while Following !!");
      });
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Profile Image */}
            <div className="rounded-full shadow-lg overflow-hidden h-40 w-40">
              <img
                src={profile?.avatar || Logo.defaultUser}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            {/* Name + Username */}
            <div className="text-left pl-2.5">
              <h1 className="text-3xl font-bold text-white">{profile?.name}</h1>
              <p className="text-white opacity-70 font-semibold text-lg">
                @{profile?.username}
              </p>
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
        <div className="flex justify-between space-y-5 mx-4">
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-bold">
              {profile?.projects?.length || 0}
            </p>
            <p className="text-white opacity-60">posts</p>
          </div>
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-bold">
              {/* {profile?.followers?.length || 0} */}
              {countFollowers}
            </p>
            <p className="text-white opacity-60">followers</p>
          </div>
          <div className="text-center cursor-pointer">
            <p className="text-2xl font-bold">
              {/* {profile?.following?.length || 0} */}
              {countFollowing}
            </p>
            <p className="text-white opacity-60">following</p>
          </div>
        </div>
        <div className="mb-6">
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
              <button
                className={`flex-1 py-2 p-1 px-4 rounded-lg font-bold hover:opacity-90 transition ${
                  isFollowing
                    ? "bg-neutral-800 text-white"
                    : "bg-white text-black"
                }`}
                onClick={handleFollowing}
              >
                {isFollowing ? "Following" : "Follow"}
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
