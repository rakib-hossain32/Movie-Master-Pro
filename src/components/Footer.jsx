import React from "react";
import { motion } from "framer-motion";
import { Facebook, Sparkles, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

export default function Footer() {
  const { isDarkMode } = useAuth();

  // Conditional theme classes
  const glassBg = isDarkMode
    ? "bg-gray-800/40 border-gray-600/20"
    : "bg-white/30 border-gray-300/20";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const headingColor = isDarkMode ? "text-cyan-400" : "text-rose-500";

  return (
    <footer className="relative z-10 w-full pt-16 pb-8 mt-8 overflow-hidden">
      {/* Glow Lights */}
      <div className="absolute top-0 z-0 w-full h-full -translate-x-1/2 pointer-events-none select-none left-1/2">
        <div className="absolute rounded-full -top-32 left-1/4 h-72 w-72 bg-rose-600/20 blur-3xl"></div>
        <div className="absolute rounded-full right-1/4 -bottom-24 h-80 w-80 bg-cyan-400/20 blur-3xl"></div>
      </div>

      {/* Main Glass Container */}
      <div
        className={`relative flex flex-col items-center max-w-6xl gap-8 px-6 py-10 mx-auto rounded-2xl border ${glassBg} backdrop-blur-md md:flex-row md:items-start md:justify-between md:gap-12 transition-all duration-500`}
      >
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <motion.a
            href="/"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {" "}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-rose-500 to-rose-700">
              {" "}
              <Sparkles className="w-5 h-5 text-white" />{" "}
            </div>{" "}
            <span className="text-xl font-bold leading-4 text-transparent bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text">
              {" "}
              Movies <br /> Master Pro{" "}
            </span>{" "}
          </motion.a>

          <p
            className={`max-w-xs my-6 text-sm text-center md:text-left ${textColor}`}
          >
            MovieMaster Pro helps you discover, organize, and manage your
            favorite movies. Explore top-rated films, create personal
            collections, and enjoy seamless browsing.
          </p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition ${textColor} hover:text-rose-500`}
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition ${textColor} hover:text-cyan-400`}
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition ${textColor} hover:text-red-500`}
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col w-full gap-8 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div
              className={`mb-3 text-xs font-semibold tracking-widest uppercase ${headingColor}`}
            >
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className={textColor}>
                  Features
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div
              className={`mb-3 text-xs font-semibold tracking-widest uppercase ${headingColor}`}
            >
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className={textColor}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div
              className={`mb-3 text-xs font-semibold tracking-widest uppercase ${headingColor}`}
            >
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className={textColor}>
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Community
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Support
                </a>
              </li>
              <li>
                <a href="#" className={textColor}>
                  Security
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom Copyright */}
      <div className={`relative z-10 mt-10 text-xs text-center ${textColor}`}>
        © 2025 MovieMaster Pro. All rights reserved.
      </div>
    </footer>
  );
}
