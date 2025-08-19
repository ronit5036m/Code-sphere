import { useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { useAuth } from "../../Context/AuthContext";
import { Search, Heart, PlusSquare, Menu, HomeIcon, Send } from "lucide-react";
import Logo from "../../assets/logo";
import MoreMenu from "../MoreComponent/More";
import Footer from "../Footer/Footer";
import { GrHomeRounded } from "react-icons/gr";

export const DesktopSidebar = () => {
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const { CurrentUser } = useAuth();
  const { isSearch, setIsSearch } = useContext(SearchContext);
  return (
    <>
      <aside className="sticky top-0 h-screen bg-black border-r border-neutral-900 flex flex-col w-64">
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-900">
          <Link
            to="/"
            className="bg-gradient-to-tl from-pink-600 via-red-500 to-orange-400 bg-clip-text text-transparent text-3xl font-bold font-cursive font-mono"
          >
            Codesphere
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 mt-4">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
              ${
                isActive
                  ? "bg-none text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <GrHomeRounded
              size={25}
              className={`group-hover:scale-110 transition-transform text-white`}
            />
            <div>Home</div>
          </NavLink>

          {/* Search */}

          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
              ${
                isActive
                  ? "bg-none text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
            onClick={() => setIsSearch(!isSearch)}
          >
            <Search
              size={25}
              className="group-hover:scale-110 transition-transform"
            />
            <div>Search</div>
          </NavLink>

          {/* Messages */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
              ${
                isActive
                  ? "bg-none text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <Send
              size={25}
              className="group-hover:scale-110 transition-transform"
            />
            <div>Messages</div>
          </NavLink>

          {isMoreClicked && <MoreMenu />}

          {/* Notification */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
              ${
                isActive
                  ? "bg-none text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <Heart
              size={25}
              className="group-hover:scale-110 transition-transform"
            />
            <div>Notification</div>
          </NavLink>

          {/* Create Post */}

          <NavLink
            to="/create-projects"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
              ${
                isActive
                  ? "bg-none text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <PlusSquare
              size={25}
              className="group-hover:scale-110 transition-transform"
            />
            <div>Create</div>
          </NavLink>

          {/* User Profile */}

          <NavLink
            to={`/profile/${CurrentUser?.existuser?._id}`}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
              ${
                isActive
                  ? "bg-none text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <div className="group-hover:scale-110 transition-transform flex justify-center items-center overflow-hidden">
              <img
                src={CurrentUser?.existuser?.avatar || Logo?.defaultUser}
                alt={"profile"}
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
            <div>Profile</div>
          </NavLink>

          {/* More menu */}

          <NavLink
            className={`group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5 relative`}
            onClick={() => setIsMoreClicked(!isMoreClicked)}
          >
            <Menu
              size={25}
              className="group-hover:scale-110 transition-transform"
            />

            <div>More</div>
          </NavLink>
        </nav>
        <div className="w-full flex justify-center items-center">
          <Footer />
        </div>
      </aside>
    </>
  );
};
