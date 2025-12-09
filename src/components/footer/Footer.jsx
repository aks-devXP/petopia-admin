import React from "react";
import { Twitter, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import logo from "assets/svg/petopia-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-navy-700 text-gray-600 dark:text-white pt-10 pb-6 px-6 lg:px-12 border-t border-gray-200 dark:border-white/10 rounded-t-2xl">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Tagline */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-3 gap-3">
              <img src={logo} className="min-w-12 h-12" alt="Petopia Logo" />
              <span className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
                Petopia — Because every pet deserves love, care, and a better life.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-5 text-sm font-medium mb-4 md:mb-0">
            <a href="#ecosystem" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Ecosystem
            </a>
            <a href="#token" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Token
            </a>
            <a href="#docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Docs
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Contact Us
            </a>
            <a href="#terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Terms of Service
            </a>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © {1900 + new Date().getYear()} Petopia. All rights reserved.
          </div>

          <div className="flex space-x-4">
            <a href="#instagram" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#twitter" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#linkedin" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
              <Linkedin size={20} />
            </a>
            <a href="#facebook" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#github" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
