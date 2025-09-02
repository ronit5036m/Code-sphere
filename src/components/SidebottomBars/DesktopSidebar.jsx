// import { useState, useContext } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { SearchContext } from "../../Context/SearchContext";
// import { useAuth } from "../../Context/AuthContext";
// import {
//   Search,
//   Heart,
//   PlusSquare,
//   Menu,
//   HomeIcon,
//   Send,
//   House,
// } from "lucide-react";
// import Logo from "../../assets/logo";
// import MoreMenu from "../MoreComponent/More";
// import Footer from "../Footer/Footer";
// import { GrHomeRounded } from "react-icons/gr";

// export const DesktopSidebar = () => {
//   const [isMoreClicked, setIsMoreClicked] = useState(false);
//   const { CurrentUser } = useAuth();
//   const { isSearch, setIsSearch } = useContext(SearchContext);
//   return (
//     <>
//       <aside className="sticky top-0 h-screen bg-black border-r border-neutral-900 flex flex-col w-64">
//         {/* Logo */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-900">
//           {/* <Link
//             to="/"
//             className="bg-gradient-to-tl from-pink-600 via-red-500 to-orange-400 bg-clip-text text-transparent text-3xl font-bold font-cursive font-mono"
//           >
//             Codesphere
//           </Link> */}
//           <Link
//             to="/"
//             className="text-white text-3xl font-bold font-cursive font-mono"
//           >
//             Codesphere
//           </Link>
//         </div>

//         {/* Menu */}
//         <nav className="flex flex-col gap-2 mt-4">
//           {/* Home */}
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5 text-white
//               ${
//                 isActive
//                   ? "bg-none text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`
//             }
//           >
//             <House
//               size={25}
//               className={`group-hover:scale-110 transition-transform text-white`}
//             />
//             <div>Home</div>
//           </NavLink>

//           {/* Search */}

//           <NavLink
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-orange- mx-2.5
//               ${
//                 isActive
//                   ? "bg-none text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`
//             }
//             onClick={() => setIsSearch(!isSearch)}
//           >
//             <Search
//               size={25}
//               className="group-hover:scale-110 transition-transform"
//             />
//             <div>Search</div>
//           </NavLink>

//           {/* Messages */}

//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
//               ${
//                 isActive
//                   ? "bg-none text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`
//             }
//           >
//             <Send
//               size={25}
//               className="group-hover:scale-110 transition-transform"
//             />
//             <div>Messages</div>
//           </NavLink>

//           {isMoreClicked && <MoreMenu />}

//           {/* Notification */}

//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
//               ${
//                 isActive
//                   ? "bg-none text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`
//             }
//           >
//             <Heart
//               size={25}
//               className="group-hover:scale-110 transition-transform"
//             />
//             <div>Notification</div>
//           </NavLink>

//           {/* Create Post */}

//           <NavLink
//             to="/create-projects"
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5 text-white
//               ${
//                 isActive
//                   ? "bg-none text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`
//             }
//           >
//             <PlusSquare
//               size={25}
//               className="group-hover:scale-110 transition-transform"
//             />
//             <div>Create</div>
//           </NavLink>

//           {/* User Profile */}

//           <NavLink
//             to={`/profile/${CurrentUser?.existuser?._id}`}
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5
//               ${
//                 isActive
//                   ? "bg-none text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               }`
//             }
//           >
//             <div className="group-hover:scale-110 transition-transform flex justify-center items-center overflow-hidden">
//               <img
//                 src={CurrentUser?.existuser?.avatar || Logo?.defaultUser}
//                 alt={"profile"}
//                 className="h-8 w-8 rounded-full object-cover"
//               />
//             </div>
//             <div>Profile</div>
//           </NavLink>

//           {/* More menu */}

//           <NavLink
//             className={`group flex items-center gap-3 px-4 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-neutral-900 mx-2.5 relative`}
//             onClick={() => setIsMoreClicked(!isMoreClicked)}
//           >
//             <Menu
//               size={25}
//               className="group-hover:scale-110 transition-transform"
//             />

//             <div>More</div>
//           </NavLink>
//         </nav>
//         <div className="w-full flex justify-center items-center">
//           <Footer />
//         </div>
//       </aside>
//     </>
//   );
// };

import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { useAuth } from "../../Context/AuthContext";
import { Search, Heart, PlusSquare, Menu, Send, House } from "lucide-react";
import Logo from "../../assets/logo";
import MoreMenu from "../MoreComponent/More";
import Footer from "../Footer/Footer";

export const DesktopSidebar = () => {
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const { CurrentUser } = useAuth();
  const { isSearch, setIsSearch } = useContext(SearchContext);

  // Sidebar Menu Items
  const menuItems = [
    { name: "Home", icon: House, to: "/" },
    {
      name: "Search",
      icon: Search,
      action: () => setIsSearch(!isSearch),
    },
    { name: "Messages", icon: Send, to: "#" },
    { name: "Notification", icon: Heart, to: "#" },
    { name: "Create", icon: PlusSquare, to: "/create-projects" },
    {
      name: "Profile",
      avatar: true,
      to: `/profile/${CurrentUser?.existuser?._id}`,
    },
    {
      name: "More",
      icon: Menu,
      action: () => setIsMoreClicked(!isMoreClicked),
    },
  ];

  // Standard NavLink Styles
  const baseLink =
    "group flex items-center gap-3 px-4 py-3 rounded-2xl text-lg transition-all duration-300 mx-2.5";
  const activeStyle = "bg-neutral-800 text-white shadow-md";
  const inactiveStyle = "text-gray-400 hover:bg-neutral-800 hover:text-white";

  return (
    <aside className="sticky top-0 h-screen bg-black border-r border-neutral-900 flex flex-col w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-neutral-900">
        <Link to="/" className="text-white text-3xl font-bold tracking-wide">
          Codesphere
        </Link>
      </div>
      {/* Menu */}
      {isMoreClicked && <MoreMenu />}
      <nav className="flex flex-col gap-1 mt-6">
        {menuItems.map((item, index) => {
          const isSpecial =
            item.name === "Messages" || item.name === "Notification";

          // Profile Item
          if (item.avatar) {
            return (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <div className="group-hover:scale-110 transition-transform flex items-center overflow-hidden">
                  <img
                    src={CurrentUser?.existuser?.avatar || Logo?.defaultUser}
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover border border-neutral-700"
                  />
                </div>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          }

          // Items with custom action (Search, More)
          if (item.action) {
            return (
              <button
                key={index}
                onClick={item.action}
                className={`${baseLink} ${inactiveStyle} text-left`}
              >
                <item.icon
                  size={25}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          }

          // Special case → Messages & Notification (no active style)
          if (isSpecial) {
            return (
              <NavLink
                key={index}
                to={item.to}
                className={`${baseLink} ${inactiveStyle}`}
              >
                <item.icon
                  size={25}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          }

          // Normal NavLink Items
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <item.icon
                size={25}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto w-full flex justify-center items-center p-4 border-t border-neutral-900">
        <Footer />
      </div>
    </aside>
  );
};
