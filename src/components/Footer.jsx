import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FiMail, FiFileText } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1 rounded-lg">
                <FaCalendar className="w-5 h-5 text-indigo-700" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Routine<span className="text-indigo-200">View</span>
              </span>
            </div>
            <p className="text-sm text-indigo-200 max-w-xs">
              An easy way to view your routine.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.instagram.com/kaus_tuv__/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/duwadikaustuv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="/"
                className="text-indigo-200 hover:text-white transition-colors flex items-center"
              >
                <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full mr-2"></span>
                Today's Schedule
              </a>
              <a
                href="/full-routine"
                className="text-indigo-200 hover:text-white transition-colors flex items-center"
              >
                <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full mr-2"></span>
                Full Routine
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Me</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:contact@routineview.com"
                className="text-indigo-200 hover:text-white transition-colors flex items-center"
              >
                <FiMail className="mr-2" />
                kaustuv.duwadi@gmail.com
              </a>
              <a
                href="https://www.instagram.com/kaus_tuv__/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition-colors flex items-center"
              >
                <FaInstagram className="mr-2" />
                Follow on Instagram
              </a>
              <div className="bg-indigo-700/50 rounded-lg p-3 mt-2">
                <p className="text-sm text-white">
                  Need to build websites? Feel free to reach out!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-indigo-500/10 via-white/20 to-indigo-500/10 my-6"></div>

        {/* Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-indigo-200">
            © {currentYear} RoutineView. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-x-6 gap-y-2 justify-center"></div>
        </div>

        {/* Designer Credit */}
        <div className="text-center mt-6">
          <p className="text-xs text-indigo-300">
            Designed and developed with <span className="text-pink-400">♥</span>{" "}
            by{" "}
            <a
              href="https://www.instagram.com/kaus_tuv__/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-200 transition-colors font-medium"
            >
              Kaustuv Duwadi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
