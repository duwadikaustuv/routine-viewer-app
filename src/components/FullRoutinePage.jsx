import React, { useState, useEffect } from "react";
import { AiFillCaretDown, AiOutlineCheck } from "react-icons/ai";

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

const FullRoutinePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [displayOptions, setDisplayOptions] = useState({
    day: true,
    time: true,
    block: true,
    room: true,
    classType: false,
    moduleTitle: false,
    lecturer: false,
  });

  const handleChooseClick = () => {
    setShowPopup(!showPopup);
  };

  const handleCheckboxChange = (event) => {
    setDisplayOptions({
      ...displayOptions,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        !event.target.closest(".popup-menu") &&
        !event.target.closest(".choose-btn")
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  return (
    <div className="bg-white text-[#41448B] pt-28 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-4">Today's Routine</h1>

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
          <div className="popup-menu bg-white text-[#41448B] p-4 mt-2 rounded-md shadow-lg absolute top-full left-0 w-60 z-50">
            <div className="flex flex-col">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="day"
                  checked={displayOptions.day}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Day
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="time"
                  checked={displayOptions.time}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Time
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="block"
                  checked={displayOptions.block}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Block
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="room"
                  checked={displayOptions.room}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Room
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="classType"
                  checked={displayOptions.classType}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Class Type
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="moduleTitle"
                  checked={displayOptions.moduleTitle}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Module Title
              </label>
              <label className="flex items-center">
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
              {displayOptions.day && (
                <th className="py-2 px-4 border-b">Day</th>
              )}
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
            {routineData.map((entry, index) => (
              <tr key={index}>
                {displayOptions.day && (
                  <td className="py-2 px-4 border-b">{entry.day}</td>
                )}
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

export default FullRoutinePage;
