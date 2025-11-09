import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Sparkles, House, Film, Heart, Plus } from "lucide-react";
import { Link, Navigate, NavLink, useNavigate } from "react-router";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => { 
    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
   }, [theme])

  const navigate = useNavigate();

  const handleTheme = (checked) => { 
    setTheme(checked ? 'dark' : 'light')
   }

  const navItems = [
    { name: "Home", to: "/", icon: <House size={18} /> },
    { name: "All Movies", to: "/all-movies", icon: <Film size={18} /> },
    {
      name: "My Collection",
      to: "/my-collection",
      icon: <Heart size={18} />,
    },
    { name: "Add Movie", to: "/add-movie", icon: <Plus size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    scrolled: { y: 0, opacity: 1 }, // scroll holeo visible thakbe
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 duration-300 "
      variants={headerVariants}
      initial="initial"
      animate={isScrolled ? "scrolled" : "animate"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor:
          theme === "dark"
            ? isScrolled
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(0, 0, 0, 0.25)"
            : isScrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0.6)",
        boxShadow: isScrolled ? "0 8px 32px rgba(0,0,0,0.15)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.a
            href="/"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-rose-500 to-rose-700">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold leading-4 text-transparent bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text">
              Movies
              <br /> Master Pro
            </span>
          </motion.a>

          <nav className="items-center hidden space-x-6 lg:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#e50914]/10 text-[#e50914] border border-[#e50914]/20 px-4 py-2 rounded-lg underline"
                        : " hover:text-[#e50914] hover:underline  rounded-lg"
                    }  flex items-center gap-1 font-medium`
                  }
                  // className={`px-4 py-2 rounded-lg ${({ isActive }) =>
                  //   isActive
                  //     ? "bg-[#e50914]/10 text-[#e50914] border border-[#e50914]/20"
                  //     : "text-muted-foreground hover:text-white hover:bg-gray-900/50"}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </div>
            ))}
          </nav>

          <div className="items-center hidden space-x-4 lg:flex">
            <label className="toggle text-base-content">
              <input
                type="checkbox"
                onChange={(e) => handleTheme(e.target.checked)}
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className=""
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `${
                  isActive ? "text-rose-500 underline" : ""
                } text-gray-900 font-medium transition-colors duration-200 hover:text-rose-500 hover:underline`
              }
            >
              Login
            </NavLink>
            <motion.NavLink
              onClick={() => navigate("/register")}
              className="inline-flex items-center space-x-2 rounded-full bg-linear-to-r from-rose-500 to-rose-700 px-6 py-2.5 font-medium text-white transition-all duration-200 hover:shadow-lg cursor-pointer hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </motion.NavLink>
          </div>

          <motion.button
            className="p-2 transition-colors duration-200 rounded-lg lg:hidden hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-4 mt-4 space-y-2 border border-gray-200 shadow-xl bg-white/95 rounded-xl backdrop-blur-lg">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-[#e50914]/10  dark:text-[#e50914] border border-[#e50914]/20 px-4 py-2 rounded-lg underline"
                          : " hover:text-[#e50914] hover:underline  rounded-lg "
                      }  block px-4 py-3 font-medium  hover:bg-[#e50914]/10  transition `
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <div className="py-2 space-y-2">
                  <NavLink
                    to={"/Login"}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-rose-500 underline" : ""
                      } block w-full rounded-lg py-2.5 text-center font-medium text-gray-900 hover:bg-gray-100 transition hover:text-rose-500 hover:underline`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    className="block w-full rounded-lg bg-linear-to-r from-rose-500 to-rose-700 py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

// import React from "react";

// import { NavLink } from "react-router";
// import { FiFilm } from "react-icons/fi";
// import { Film, Heart, House, Plus } from "lucide-react";

// const Header = () => {
//   return (
//       <header className="">
//           <div className="text-2xl font-bold backdrop-blur-3xl">
//               Movie Master Pro
//           </div>
//       <div className="">
//         <ul className="flex items-center gap-5 // ">
//           <li className="">
//             <NavLink className="flex items-center gap-1 ">
//               <House />
//               Home
//             </NavLink>
//           </li>
//           <li className="">
//             <NavLink className="flex items-center gap-1 ">
//               <Film />
//               All Movies
//             </NavLink>
//           </li>
//           <li className="">
//             <NavLink className="flex items-center gap-1 ">
//               <Heart />
//               My Collection
//             </NavLink>
//           </li>
//           <li className="">
//             <NavLink className="flex items-center gap-1 ">
//               <House />
//               Home
//             </NavLink>
//           </li>
//           <li className="">
//             <NavLink className="flex items-center gap-1 ">
//               <Plus />
//               Add Movie
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default Header;
