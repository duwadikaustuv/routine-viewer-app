import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiSettings,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiBook,
  FiUser,
  FiGrid,
} from "react-icons/fi";
import { routineData, getSections } from "./data.js";

const FullRoutinePage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selections, setSelections] = useState(() => {
    const saved = localStorage.getItem("routineSelections");
    return saved
      ? JSON.parse(saved)
      : {
          year: "Year 2",
          faculty: "Computing",
          section: "C12",
        };
  });

  const [displayOptions, setDisplayOptions] = useState({
    day: true,
    time: true,
    block: true,
    room: true,
    classType: true,
    moduleTitle: true,
    lecturer: false,
  });

  const optionsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("routineSelections", JSON.stringify(selections));
  }, [selections]);

  const filteredRoutine = routineData.filter(
    (item) =>
      item.year === selections.year &&
      item.faculty === selections.faculty &&
      item.section === selections.section
  );

  const handleClickOutside = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get class badge color
  const getClassTypeBadge = (type) => {
    const types = {
      Lecture: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Lab: "bg-green-100 text-green-800 border-green-200",
      Tutorial: "bg-blue-100 text-blue-800 border-blue-200",
      Workshop: "bg-amber-100 text-amber-800 border-amber-200",
      Seminar: "bg-purple-100 text-purple-800 border-purple-200",
    };

    return types[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-white p-2 rounded-lg shadow-sm mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Full Schedule
          </h1>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
            <span className="mr-1">📚</span> {selections.year} •{" "}
            {selections.faculty} • Section {selections.section}
          </div>
        </div>

        {/* Controls Container */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">
            Customize Your Schedule
          </h2>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-1">
                Year
              </label>
              <select
                value={selections.year}
                onChange={(e) =>
                  setSelections((prev) => ({ ...prev, year: e.target.value }))
                }
                className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {["Year 1", "Year 2", "Year 3"].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-1">
                Faculty
              </label>
              <select
                value={selections.faculty}
                onChange={(e) =>
                  setSelections((prev) => ({
                    ...prev,
                    faculty: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {["Computing", "Networking", "AI", "Multimedia"].map(
                  (faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-1">
                Section
              </label>
              <select
                value={selections.section}
                onChange={(e) =>
                  setSelections((prev) => ({
                    ...prev,
                    section: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {getSections(selections.year, selections.faculty).map(
                  (section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Display Options */}
          <div className="relative" ref={optionsRef}>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <FiSettings className="text-indigo-600" />
              <span className="font-medium text-indigo-700">
                Display Options
              </span>
              <FiChevronDown className="text-indigo-500" />
            </button>
            {showOptions && (
              <div className="absolute mt-2 w-52 bg-white border border-indigo-100 rounded-lg shadow-lg p-3 z-10">
                <div className="text-sm font-medium text-indigo-700 mb-2">
                  Show/Hide Columns
                </div>
                {Object.entries(displayOptions).map(([key, value]) => {
                  // Get icon based on option key
                  const getOptionIcon = (key) => {
                    const icons = {
                      day: <FiCalendar size={14} />,
                      time: <FiClock size={14} />,
                      block: <FiGrid size={14} />,
                      room: <FiMapPin size={14} />,
                      classType: <FiBook size={14} />,
                      moduleTitle: <FiBook size={14} />,
                      lecturer: <FiUser size={14} />,
                    };
                    return icons[key] || null;
                  };

                  return (
                    <label
                      key={key}
                      className="flex items-center gap-2 p-2 hover:bg-indigo-50 rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setDisplayOptions((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 flex items-center gap-1.5">
                        {getOptionIcon(key)}
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Schedule Cards (Mobile) */}
        <div className="md:hidden space-y-4 mb-8">
          {filteredRoutine.length > 0 ? (
            filteredRoutine.map((entry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  {displayOptions.day && (
                    <div className="bg-indigo-50 px-3 py-1 rounded text-indigo-800 font-medium">
                      {entry.day}
                    </div>
                  )}
                  {displayOptions.time && (
                    <div className="bg-indigo-50 px-3 py-1 rounded text-indigo-800 font-medium flex items-center">
                      <FiClock className="mr-1" size={14} />
                      {entry.time}
                    </div>
                  )}
                  {displayOptions.classType && (
                    <div
                      className={`px-3 py-1 rounded text-sm border ${getClassTypeBadge(
                        entry.type
                      )}`}
                    >
                      {entry.type}
                    </div>
                  )}
                </div>

                {displayOptions.moduleTitle && (
                  <div className="font-semibold text-indigo-900 text-lg mb-2">
                    {entry.module}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {displayOptions.block && (
                    <div className="flex items-center text-gray-700">
                      <FiGrid className="mr-1" size={14} />
                      Block: {entry.block}
                    </div>
                  )}
                  {displayOptions.room && (
                    <div className="flex items-center text-gray-700">
                      <FiMapPin className="mr-1" size={14} />
                      Room: {entry.room}
                    </div>
                  )}
                  {displayOptions.lecturer && (
                    <div className="flex items-center text-gray-700 col-span-2">
                      <FiUser className="mr-1" size={14} />
                      {entry.lecturer}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-indigo-900 mb-2">
                No Classes Found
              </h3>
              <p className="text-gray-600">
                Try changing your selection criteria.
              </p>
            </div>
          )}
        </div>

        {/* Schedule Table (Desktop) */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                {displayOptions.day && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      Day
                    </div>
                  </th>
                )}
                {displayOptions.time && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiClock className="mr-2" />
                      Time
                    </div>
                  </th>
                )}
                {displayOptions.block && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiGrid className="mr-2" />
                      Block
                    </div>
                  </th>
                )}
                {displayOptions.room && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiMapPin className="mr-2" />
                      Room
                    </div>
                  </th>
                )}
                {displayOptions.classType && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiBook className="mr-2" />
                      Type
                    </div>
                  </th>
                )}
                {displayOptions.moduleTitle && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiBook className="mr-2" />
                      Module
                    </div>
                  </th>
                )}
                {displayOptions.lecturer && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      Lecturer
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {filteredRoutine.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  {displayOptions.day && (
                    <td className="px-4 py-4 text-sm font-medium text-indigo-700">
                      {entry.day}
                    </td>
                  )}
                  {displayOptions.time && (
                    <td className="px-4 py-4 text-sm font-medium text-indigo-700">
                      {entry.time}
                    </td>
                  )}
                  {displayOptions.block && (
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {entry.block}
                    </td>
                  )}
                  {displayOptions.room && (
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {entry.room}
                    </td>
                  )}
                  {displayOptions.classType && (
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getClassTypeBadge(
                          entry.type
                        )}`}
                      >
                        {entry.type}
                      </span>
                    </td>
                  )}
                  {displayOptions.moduleTitle && (
                    <td className="px-4 py-4 text-sm font-medium text-indigo-900">
                      {entry.module}
                    </td>
                  )}
                  {displayOptions.lecturer && (
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {entry.lecturer}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRoutine.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-indigo-900 mb-2">
                No Classes Found
              </h3>
              <p className="text-gray-600">
                Try changing your selection criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullRoutinePage;
