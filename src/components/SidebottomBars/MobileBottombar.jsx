import React, { useContext } from "react";
import { Home, Search, PlusSquare, Heart, User, Send } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { useAuth } from "../../Context/AuthContext";
import Logo from "../../assets/logo";

export default function MobileBottombar() {
  const { isSearch, setIsSearch } = useContext(SearchContext);
  const { CurrentUser } = useAuth();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom Navigation"
    >
      <div className="mx-auto max-w-md px-2">
        <div className="backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 border-t dark:border-neutral-800 rounded-t-2xl shadow-lg">
          <ul className="flex items-center justify-between px-2">
            {/* Home */}

            <NavLink
              to="/"
              className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md active:text-black active:dark:text-white text-neutral-500 dark:text-neutral-400
              `}
            >
              <Home
                size={25}
                className={`transition-transform duration-150 active:scale-110 scale-100 text-white`}
              ></Home>
            </NavLink>

            {/* Search */}

            <NavLink
              className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md active:text-black active:dark:text-white text-neutral-500 dark:text-neutral-400
              `}
            >
              <Search
                size={25}
                className={`transition-transform duration-150 active:scale-110 scale-100 text-white`}
                onClick={() => setIsSearch(!isSearch)}
              ></Search>
            </NavLink>

            {/* Create */}

            <NavLink
              to="/create-projects"
              className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md active:text-black active:dark:text-white text-neutral-500 dark:text-neutral-400
              `}
            >
              <PlusSquare
                size={25}
                className={`transition-transform duration-150 active:scale-110 scale-100 text-white`}
              ></PlusSquare>
            </NavLink>

            {/* Maggeges */}

            <NavLink
              to="/"
              className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md active:text-black active:dark:text-white text-neutral-500 dark:text-neutral-400
              `}
            >
              <Send
                size={25}
                className={`transition-transform duration-150 active:scale-110 scale-100 text-white`}
              ></Send>
            </NavLink>

            {/* Profile */}

            <NavLink
              to={`/profile/${CurrentUser?.existuser?._id}`}
              className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md active:text-black active:dark:text-white text-neutral-500 dark:text-neutral-400
              `}
            >
              <div className="h-10 w-10 p-1">
                <img
                  src={CurrentUser?.existuser?.avatar || Logo?.defaultUser}
                  alt={"profile"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}
