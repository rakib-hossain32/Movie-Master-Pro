import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Sparkles, Youtube, } from "lucide-react";
// import {FaXTwitter} from 'react-icons'
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-16 pb-8 mt-8 overflow-hidden">
      {/* Glass Effect CSS */}
      <style>{`
        .glass {
          backdrop-filter: blur(3px) saturate(180%);
          background: radial-gradient(circle, #fff9 0%, #ffdce64d 60%, #f9f2f4 100%);
          border: 1px solid #ff96b41a;
          justify-content: center;
          align-items: center;
          transition: all .3s;
          display: flex;
        }
        .dark .glass {
          backdrop-filter: blur(2px) !important;
          background: radial-gradient(circle, #ffffff1a 0%, #1e00001a 60%, #2a0e0e 100%) !important;
          border: 1px solid #ffffff0d !important;
          border-radius: 16px !important;
        }
      `}</style>

      {/* Glow Lights */}
      <div className="absolute top-0 z-0 w-full h-full -translate-x-1/2 pointer-events-none select-none left-1/2">
        <div className="absolute rounded-full -top-32 left-1/4 h-72 w-72 bg-rose-600/20 blur-3xl"></div>
        <div className="absolute rounded-full right-1/4 -bottom-24 h-80 w-80 bg-rose-600/20 blur-3xl"></div>
      </div>

      {/* Main Glass Container */}
      <div className="relative flex flex-col items-center max-w-6xl gap-8 px-6 py-10 mx-auto glass rounded-2xl md:flex-row md:items-start md:justify-between md:gap-12">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
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

          <p className="max-w-xs my-6 text-sm text-center text-foreground md:text-left">
            Mvpblocks provides reusable UI components to build modern websites
            easily.
          </p>

          <div className="flex gap-3 mt-2 text-rose-400">
            <a href="#" className="transition hover:text-foreground">
              <Facebook />
            </a>
            <a href="#" className="transition hover:text-foreground">
              <FaXTwitter size={24} />
            </a>
            <a href="#" className="transition hover:text-foreground">
              <Youtube/>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col w-full text-center gap-9 md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest uppercase text-rose-400">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest uppercase text-rose-400">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest uppercase text-rose-400">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom Copyright */}
      <div className="relative z-10 mt-10 text-xs text-center text-foreground">
        © 2025 Movies Master Pro. All rights reserved.
      </div>
    </footer>
  );
}
