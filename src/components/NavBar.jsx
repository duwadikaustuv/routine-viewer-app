import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"; // Import calendar-day icon
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons"; // Calendar-days icon
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"; // Import LinkedIn icon
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navRef = useRef(null);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleClickOutside = (event) => {
    if (nav && navRef.current && !navRef.current.contains(event.target)) {
      setNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav]);

  const navItems = [
    { id: 1, text: "Today Page", link: "/" },
    { id: 2, text: "Full Routine Page", link: "/full-routine" },
    {
      id: 3,
      text: "Contact",
      link: "https://www.linkedin.com/in/kaustuvduwadi/",
      external: true,
    },
  ];

  return (
    <div className="bg-[#41448B] flex justify-between items-center h-24 w-full px-4 text-white rounded-b-2xl fixed top-0 left-0 z-50">
      {/* Logo */}
      <img
        src="/routine-viewer-logo.png"
        alt="Routine Viewer Logo"
        className="h-24" // Adjust the height of the logo as necessary
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-white hover:text-[#41448B] rounded-lg m-2 cursor-pointer duration-300"
          >
            {item.external ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.id === 3 && (
                  <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                )}
                {item.text}
              </a>
            ) : (
              <Link to={item.link}>
                {item.id === 1 && (
                  <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                )}
                {item.id === 2 && (
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                )}
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        ref={navRef}
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r rounded-r-2xl border-r-[#4f5195] bg-[#41448B] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Logo in mobile navigation */}
        <img
          src="/routine-viewer-logo.png"
          alt="Routine Viewer Logo"
          className="h-24 m-4" // Adjust height and margin as necessary
        />

        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-lg hover:bg-white duration-300 hover:text-[#41448B] cursor-pointer border-gray-600"
          >
            {item.external ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.id === 3 && (
                  <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                )}
                {item.text}
              </a>
            ) : (
              <Link to={item.link}>
                {item.id === 1 && (
                  <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                )}
                {item.id === 2 && (
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                )}
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
