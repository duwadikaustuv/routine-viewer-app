import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCalendar, FiGrid } from "react-icons/fi";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Today", icon: <FiCalendar className="w-5 h-5" /> },
    {
      path: "/full-routine",
      name: "Full Routine",
      icon: <FiGrid className="w-5 h-5" />,
    },
  ];

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-indigo-600 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors group"
          >
            <div className="bg-white p-1 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <FiCalendar className="w-5 h-5 text-indigo-700" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Routine<span className="text-indigo-200">View</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.path && location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-inner"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`p-1 rounded mr-2 ${
                      isActive ? "bg-white/20" : "bg-indigo-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 rounded-lg text-white bg-indigo-700 hover:bg-indigo-600 transition-colors shadow-md"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {navOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={navRef}
          className={`md:hidden absolute left-0 right-0 bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-xl transition-all duration-300 ease-out overflow-hidden rounded-b-lg ${
            navOpen
              ? "max-h-96 opacity-100 border-t border-indigo-500"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-3 pb-5 space-y-3">
            {navItems.map((item) => {
              const isActive = item.path && location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-inner"
                      : "text-white hover:bg-indigo-600"
                  }`}
                  onClick={() => setNavOpen(false)}
                >
                  <span
                    className={`p-2 rounded-md shadow-sm ${
                      isActive ? "bg-indigo-500" : "bg-indigo-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
