import React, { useState } from "react";
import Dropdown from "components/dropdown";
import { Link } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import avatar from "assets/img/profile/banner.png";

const Navbar = ({ brandText }) => {
  const [darkmode, setDarkmode] = useState(false);

  const toggleDarkMode = () => {
    if (darkmode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    setDarkmode(!darkmode);
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      {/* Left Side - Title */}
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <span className="text-sm font-normal text-navy-700 dark:text-white">
            Pages /
          </span>
          <Link
            to="#"
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex h-[61px] items-center gap-4 rounded-full bg-white px-4 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        {/* Dark Mode Toggle */}
        <div className="cursor-pointer text-gray-600" onClick={toggleDarkMode}>
          {darkmode ? (
            <RiSunFill className="h-5 w-5 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-5 w-5 text-gray-600 dark:text-white" />
          )}
        </div>

        {/* Profile Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={avatar}
              alt="Profile"
            />
          }
          classNames="py-2 top-8 -left-[180px] w-max"
        >
          <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="p-4">
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                👋 Hey, Adela
              </p>
            </div>
            <div className="h-px w-full bg-gray-200 dark:bg-white/20" />
            <div className="flex flex-col p-4">
              <a
                href="#"
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Profile Settings
              </a>
              <a
                href="#"
                className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500"
              >
                Log Out
              </a>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
