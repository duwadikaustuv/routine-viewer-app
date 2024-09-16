import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
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
      <h1 className="text-3xl font-bold">Routine Viewer</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-white hover:text-[#41448B] rounded-lg m-2 cursor-pointer duration-300"
          >
            {item.external ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.text}
              </a>
            ) : (
              <Link to={item.link}>{item.text}</Link>
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
        <h1 className="text-3xl font-bold text-white m-4">Routine Viewer</h1>

        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-lg hover:bg-white duration-300 hover:text-[#41448B] cursor-pointer border-gray-600"
          >
            {item.external ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.text}
              </a>
            ) : (
              <Link to={item.link}>{item.text}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
