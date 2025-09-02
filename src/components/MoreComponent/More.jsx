// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Settings, Bookmark, Moon, LogOut } from "lucide-react";
// import { useAuth } from "../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// export default function MoreMenu() {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     toast.success("Logout successfully");
//     window.location.reload();
//     navigate("/login");
//   };

//   return (
//     <div className="relative z-999">
//       {/* Dropdown */}
//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: -5 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.95, y: -5 }}
//           transition={{ duration: 0.2 }}
//           className="absolute left-0 mt-2 w-60 rounded-xl bg-neutral-900 text-white shadow-lg p-2 m-2"
//         >
//           <ul className="space-y-1">
//             <li className="px-3 py-2 rounded-md hover:bg-white/10 flex items-center gap-2 cursor-pointer">
//               <Settings size={18} /> Settings
//             </li>
//             <li className="px-3 py-2 rounded-md hover:bg-white/10 flex items-center gap-2 cursor-pointer">
//               <Bookmark size={18} /> Saved
//             </li>
//             <li className="px-3 py-2 rounded-md hover:bg-white/10 flex items-center gap-2 cursor-pointer">
//               <Moon size={18} /> Switch appearance
//             </li>
//             <li
//               onClick={() => handleLogout()}
//               className="px-3 py-2 rounded-md hover:bg-white/10 flex items-center gap-2 cursor-pointer"
//             >
//               <LogOut size={18} /> Log out
//             </li>
//           </ul>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }


import { motion, AnimatePresence } from "framer-motion";
import { Settings, Bookmark, Moon, LogOut } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function MoreMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successfully");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const menuItems = [
    { name: "Settings", icon: Settings },
    { name: "Saved", icon: Bookmark },
    { name: "Switch appearance", icon: Moon },
    { name: "Log out", icon: LogOut, action: handleLogout },
  ];

  return (
    <div className="relative z-[999]">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-64 rounded-xl bg-neutral-900 text-white shadow-xl border border-neutral-800 overflow-hidden"
        >
          <ul className="divide-y divide-neutral-800">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={item.action}
                className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-neutral-800/60 transition-colors"
              >
                <item.icon size={20} className="text-gray-300" />
                <span className="text-sm font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
