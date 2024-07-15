import React, { Fragment, useState, useRef, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import DropDown from "./dropDown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("All Chats");
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropDown]);

  return (
    <Fragment>
      <div className=" flex flex-col items-center bg-[#0e1621] sm:min-w-[4.5rem] md:min-w-[4.5rem] h-screen">
        <div className="pt-4 mb-1 cursor-pointer sticky top-50 bg-[#0e1621] w-full justify-center flex" onClick={toggleDropDown}>
          <IoMdMenu size={24} color="#768c9e" />
        </div>
        <div className="mt-3 flex flex-col items-center cursor-pointer w-full">
          <NavItem
            icon={<IoChatbubblesSharp size={29} />}
            text="All Chats"
            active={activeItem === "All Chats"}
            onClick={() => handleItemClick("All Chats")}
          />
          <NavItem
            icon={<FaFolder size={23} />}
            text="Personal"
            active={activeItem === "Personal"}
            onClick={() => handleItemClick("Personal")}
          />
          <NavItem
            icon={<FaFolder size={23} />}
            text="Unread"
            active={activeItem === "Unread"}
            onClick={() => handleItemClick("Unread")}
          />
          <NavItem
            icon={<VscSettings size={25} />}
            text="Edit"
            active={activeItem === "Edit"}
            onClick={() => handleItemClick("Edit")}
          />
        </div>
        <div className=" cursor-pointer">
          <p className="text-xs text-white bg-[#5eb5f7] border-[#0e1621] border absolute top-14 z-50 p-2 rounded-full w-6 h-4 flex justify-center items-center">10</p>
          <p className="text-xs text-white bg-[#5eb5f7] border-[#0e1621] border absolute top-28 z-50 p-2 rounded-full w-6 h-4 flex justify-center items-center">10</p>
          <p className="text-xs text-white bg-[#5eb5f7] border-[#0e1621] border absolute top-[10.6rem] z-50 p-2 rounded-full w-6 h-4 flex justify-center items-center">10</p>
        </div>
        {showDropDown && <DropDown ref={dropDownRef} />}
      </div>
    </Fragment>
  );
};

const NavItem = ({ icon, text, active, onClick }) => (
  <li
    className={`py-1 w-full flex flex-col items-center cursor-pointer ${
      active ? "bg-[#5eb5f71c] text-white" : ""
    }`}
    onClick={onClick}
  >
    {React.cloneElement(icon, {
      className: `mb-1 ${active ? "text-[#5eb5f7] w-full" : "text-[#768c9e]"}`
    })}
    <p className={`mt-1 ${active ? "text-[#5eb5f7]" : "text-[#768c9e]"} text-xs`}>
      {text}
    </p>
  </li>
);

export default Navbar;
