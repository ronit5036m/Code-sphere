import React from "react";
import { Link } from "react-router-dom";
const Footerlinks = [
  {
    id: 1,
    name: "About",
    route: "/about",
  },
  {
    id: 2,
    name: "Help",
    route: "/",
  },
  {
    id: 3,
    name: "Privacy",
    route: "/",
  },
  {
    id: 4,
    name: "Terms",
    route: "/",
  },
];
const Footer = () => {
  return (
    <>
      <div className="text-lg text-neutral-600 m-6 leading-6">
        {Footerlinks.map((link) => (
          <Link to={link.route} key={link.id} className="mr-2 hover:underline">
            {link.name}
          </Link>
        ))}
        <p className="mt-2">© 2025 code sphere</p>
      </div>
    </>
  );
};

export default Footer;
