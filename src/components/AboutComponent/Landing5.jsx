import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import FAQ from "../Cards/FAQ";
import Logo from "../../assets/logo";
import { useNavigate } from "react-router-dom";

const team = [
  { name: "Ronit", img: Logo.ronit },
  { name: "Arya", img: Logo.arya },
  { name: "Krish", img: Logo.krish },
  { name: "Rohan", img: Logo.rohan },
];

const Landing5 = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-black/90 to-[#18181b] text-gray-200 min-h-screen font-sans">
      {/* FAQ */}
      <FAQ />
      {/* Live Counter */}
      <section className="bg-gradient-to-r from-blue-950 to-gray-900 py-12 text-center">
        <p className="text-xl font-semibold">
          🎉 <span className="text-green-400">120+</span> Projects created
        </p>
      </section>
      {/* Team */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Meet the Team</h2>
        <p className="mb-6 text-gray-400">
          A group of devs passionate about giving other devs a platform to
          shine.
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((t) => (
            <div key={t.name} className="flex flex-col items-center">
              <img
                src={t.img}
                alt={t.name}
                className="rounded-full mb-2 border-2 border-blue-400 w-24 h-24 object-cover shadow-xl"
              />
              <p className="text-sm text-white">{t.name}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-blue-950 to-gray-900 px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Stay in the Loop</h2>
        <p className="text-gray-400 mb-6">
          Get updates, tips, and developer stories from CodeSphere.
        </p>
        <form className="flex flex-col md:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 text-black px-6 py-2 rounded-md font-bold transition"
          >
            Subscribe
          </button>
        </form>
      </section>
      {/* Final CTA */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Start sharing your developer journey today.
        </h2>
        <button
          onClick={() => navigate("/create-projects")}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-semibold px-8 py-3 rounded-full transition text-lg shadow-xl"
        >
          Create My Projects
        </button>
      </section>
      {/* Footer */}
      <footer className="bg-black/80 text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-3">Social</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaGithub /> GitHub
              </li>
              <li className="flex items-center gap-2">
                <FaLinkedin /> LinkedIn
              </li>
              <li className="flex items-center gap-2">
                <FaTwitter /> Twitter
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter Info */}
          <div>
            <h3 className="text-white font-bold mb-3">Newsletter</h3>
            <p>Sign up to receive updates and tips from the CodeSphere team.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} CodeSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing5;
