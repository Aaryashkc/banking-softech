import React from "react";
import { assets } from "../assets/propertyData";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white w-full h-auto p-4 shadow-lg container">
        {/* Main flex container */}
        <div className="flex flex-col items-center sm:flex-row  sm:items-center sm:justify-between">
          {/* Logo and Slogan Section */}
          <div className="flex items-center sm:flex-row sm:items-center">
            {/* Logo */}
            <div className="logo-container">
              <Link to={"/"}>
                <img
                  src={assets.logo}
                  alt="Bank Logo"
                  className="h-auto max-h-12"
                />
              </Link>
            </div>
            {/* Slogan */}
            <div className="slogan-container flex items-center mt-2 sm:mt-0 sm:ml-4">
              <div className="bg-primary1 h-8 w-[2px] ml-2 mr-2"></div>
              <p className="font-bold text-sm sm:text-lg md:text-xl">
                <span className="text-primary1 font-bold mr-2">AUCTION</span>
                <span className="text-black font-bold">ASSISTANCE</span>
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0 text-sm sm:text-base">
            <div className="flex items-center    justify-center sm:justify-end">
              <a
                href="mailto:info@siddharthbank.com"
                className="flex items-center"
              >
                <MdOutlineMailOutline className="text-[1.5rem] sm:text-[1.8rem] hover:text-black text-yellow-600 font-bold" />
              </a>
              <p className="ml-2 text-center">info@siddharthbank.com</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
