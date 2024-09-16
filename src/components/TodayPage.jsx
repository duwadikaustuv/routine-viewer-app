import React, { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

const routineData = [
  {
    day: "Sun",
    time: "11am-12:30pm",
    type: "Lab",
    module: "Network Operating Systems",
    lecturer: "Bishnu Pandey",
    block: "Skill",
    room: "Lab 11",
  },
  {
    day: "Sun",
    time: "1pm-2:30pm",
    type: "Lab",
    module: "Cloud and IOT",
    lecturer: "Jaganath Paudyal",
    block: "Skill",
    room: "Lab 08",
  },
  {
    day: "Mon",
    time: "12:30pm-2pm",
    type: "Lab",
    module: "Software Engineering",
    lecturer: "Ishan Singh Thakuri",
    block: "UK",
    room: "Oxford",
  },
  {
    day: "Tue",
    time: "7am-8:30am",
    type: "Lecture",
    module: "Databases",
    lecturer: "Aadesh Tandukar",
    block: "Kumari",
    room: "Hall-01",
  },
  {
    day: "Tue",
    time: "8:30am-10am",
    type: "Lecture",
    module: "Network Operating Systems",
    lecturer: "Dipeshwor Silwal",
    block: "Kumari",
    room: "Hall-01",
  },
  {
    day: "Wed",
    time: "10am-11am",
    type: "Tutorial",
    module: "Network Operating Systems",
    lecturer: "Bishnu Pandey",
    block: "Alumni",
    room: "Sajiya Gurung",
  },
  {
    day: "Wed",
    time: "11:30am-1pm",
    type: "Lecture",
    module: "Software Engineering",
    lecturer: "Rubin Thapa",
    block: "Kumari",
    room: "Hall-01",
  },
  {
    day: "Wed",
    time: "1pm-2:30pm",
    type: "Lecture",
    module: "Cloud and IOT",
    lecturer: "Sugat Man Shakya",
    block: "Kumari",
    room: "Hall-01",
  },
  {
    day: "Thu",
    time: "8am-9am",
    type: "Tutorial",
    module: "Cloud and IOT",
    lecturer: "Jaganath Paudyal",
    block: "London",
    room: "Tower Bridge",
  },
  {
    day: "Thu",
    time: "10am-11am",
    type: "Tutorial",
    module: "Databases",
    lecturer: "Shresha Rajbhandari",
    block: "UK",
    room: "Oxford",
  },
  {
    day: "Fri",
    time: "9am-10am",
    type: "Tutorial",
    module: "Software Engineering",
    lecturer: "Ishan Singh Thakuri",
    block: "Nepal",
    room: "Annapurna",
  },
  {
    day: "Fri",
    time: "1:30pm-3pm",
    type: "Lab",
    module: "Databases",
    lecturer: "Shresha Rajbhandari",
    block: "London",
    room: "Tower of London",
  },
];

const TodayPage = () => {
  const getCurrentDay = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
  };

  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [displayOptions, setDisplayOptions] = useState({
    time: true,
    block: true,
    room: true,
    classType: false,
    moduleTitle: false,
    lecturer: false,
  });

  const dayDropdownRef = useRef(null);
  const popupRef = useRef(null);

  const handleChooseClick = () => {
    setShowPopup((prev) => !prev);
  };

  const handleDayButtonClick = () => {
    setShowDayDropdown(!showDayDropdown);
  };

  const handleCheckboxChange = (event) => {
    setDisplayOptions({
      ...displayOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setShowDayDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.closest(".choose-btn")
      ) {
        setShowPopup(false);
      }
      if (
        showDayDropdown &&
        dayDropdownRef.current &&
        !dayDropdownRef.current.contains(event.target)
      ) {
        setShowDayDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup, showDayDropdown]);

  return (
    <div className="bg-white text-[#41448B] pt-28 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-4">Today's Routine</h1>

      {/* Day Selection Dropdown */}
      <div className="relative mb-8" ref={dayDropdownRef}>
        <button
          onClick={handleDayButtonClick}
          className="flex items-center p-2 bg-[#41448B] hover:bg-[#5a5f99] hover:text-white text-white rounded-md transition duration-300 day-btn"
        >
          <span className="mr-2">Select Day</span>
          <FaChevronDown />
        </button>
        {showDayDropdown && (
          <div className="dropdown-menu bg-white text-[#41448B] p-2 mt-2 rounded-md shadow-lg absolute top-full left-0 w-28 z-50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <div
                key={day}
                className={`py-1 px-2 cursor-pointer hover:bg-[#f0f0f0] ${
                  selectedDay === day ? "bg-[#e0e0e0]" : ""
                }`}
                onClick={() => handleDayChange(day)}
              >
                {day}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Choose Button */}
      <div className="relative mb-8">
        <button
          onClick={handleChooseClick}
          className="flex items-center p-2 bg-[#41448B] hover:bg-[#5a5f99] hover:text-white text-white rounded-md transition duration-300 choose-btn"
        >
          Choose Options <AiFillCaretDown className="ml-2" />
        </button>

        {/* Popup Menu with Checkboxes */}
        {showPopup && (
          <div
            ref={popupRef}
            className="popup-menu bg-white text-[#41448B] p-2 mt-2 rounded-md shadow-lg absolute top-full left-0 w-40 z-50 text-sm"
          >
            <div className="flex flex-col">
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="time"
                  checked={displayOptions.time}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Time
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="block"
                  checked={displayOptions.block}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Block
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="room"
                  checked={displayOptions.room}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Room
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="classType"
                  checked={displayOptions.classType}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Class Type
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="moduleTitle"
                  checked={displayOptions.moduleTitle}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Module Title
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  name="lecturer"
                  checked={displayOptions.lecturer}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Lecturer
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Routine Table */}
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-[#41448B] text-white">
            <tr>
              {displayOptions.time && (
                <th className="py-2 px-4 border-b">Time</th>
              )}
              {displayOptions.block && (
                <th className="py-2 px-4 border-b">Block</th>
              )}
              {displayOptions.room && (
                <th className="py-2 px-4 border-b">Room</th>
              )}
              {displayOptions.classType && (
                <th className="py-2 px-4 border-b">Class Type</th>
              )}
              {displayOptions.moduleTitle && (
                <th className="py-2 px-4 border-b">Module Title</th>
              )}
              {displayOptions.lecturer && (
                <th className="py-2 px-4 border-b">Lecturer</th>
              )}
            </tr>
          </thead>
          <tbody>
            {routineData
              .filter((entry) => entry.day === selectedDay)
              .map((entry, index) => (
                <tr key={index}>
                  {displayOptions.time && (
                    <td className="py-2 px-4 border-b">{entry.time}</td>
                  )}
                  {displayOptions.block && (
                    <td className="py-2 px-4 border-b">{entry.block}</td>
                  )}
                  {displayOptions.room && (
                    <td className="py-2 px-4 border-b">{entry.room}</td>
                  )}
                  {displayOptions.classType && (
                    <td className="py-2 px-4 border-b">{entry.type}</td>
                  )}
                  {displayOptions.moduleTitle && (
                    <td className="py-2 px-4 border-b">{entry.module}</td>
                  )}
                  {displayOptions.lecturer && (
                    <td className="py-2 px-4 border-b">{entry.lecturer}</td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayPage;
