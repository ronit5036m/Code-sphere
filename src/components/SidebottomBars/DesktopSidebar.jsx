import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { useAuth } from "../../Context/AuthContext";
import { Search, Heart, PlusSquare, Menu, Send, House } from "lucide-react";
import Logo from "../../assets/logo";
import MoreMenu from "../MoreComponent/More";
import Footer from "../Footer/Footer";
import { usePosts } from "../../Context/PostContext";

export const DesktopSidebar = () => {
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const { CurrentUser } = useAuth();
  const { isSearch, setIsSearch } = useContext(SearchContext);
  const { fetchPosts } = usePosts();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchPosts();
  };

  // Sidebar Menu Items
  const menuItems = [
    { name: "Home", icon: House, to: "/", onClick: scrollTop },
    { name: "Search", icon: Search, onClick: () => setIsSearch(!isSearch) },
    { name: "Messages", icon: Send, to: "#" },
    { name: "Notification", icon: Heart, to: "#" },
    { name: "Create", icon: PlusSquare, to: "/create-projects" },
    {
      name: "Profile",
      to: `/profile/${CurrentUser?.existuser?._id}`,
      avatar: CurrentUser?.existuser?.avatar || Logo?.defaultUser,
    },
    {
      name: "More",
      icon: Menu,
      onClick: () => setIsMoreClicked(!isMoreClicked),
    },
  ];

  // NavLink Styles
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

      {/* More Menu */}
      {isMoreClicked && <MoreMenu />}

      {/* Menu */}
      <nav className="flex flex-col gap-1 mt-6">
        {menuItems.map((item, index) => {
          // Avatar/Profile
          if (item.avatar) {
            return (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <img
                  src={item.avatar}
                  alt="profile"
                  className="h-9 w-9 rounded-full object-cover border border-neutral-700 group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          }

          // Buttons with action only (Search, More)
          if (item.onClick && !item.to) {
            return (
              <button
                key={index}
                onClick={item.onClick}
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

          // Normal NavLinks (Home, Create, Messages, Notification)
          return (
            <NavLink
              key={index}
              to={item.to}
              onClick={item.onClick}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              {item.icon && (
                <item.icon
                  size={25}
                  className="group-hover:scale-110 transition-transform"
                />
              )}
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
