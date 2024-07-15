// DropDown.js
import React, { forwardRef, useState } from "react";
import UserProfilePhoto from "./userProfile"; // Adjust the path as necessary
import { BiSolidWalletAlt } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiGroupLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineSaveAlt } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";
import { PiMoon } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import ToggleSwitch from "./ToggleSwitch"; // Import the ToggleSwitch component

const DropDown = forwardRef((props, ref) => {
  const [isNightModeOn, setIsNightModeOn] = useState(false);

  const handleNightModeToggle = () => {
    setIsNightModeOn(!isNightModeOn);
  };

  return (
    <div
      ref={ref}
      className="absolute bg-[#17212b] w-[15.5rem] h-screen text-white top-0 left-0 z-50"
    >
      <div className="px-4 py-4">
        <UserProfilePhoto firstName="Beyond" lastName="Chats" size="default" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm mt-3 cursor-pointer">BeyondChat</h1>
            <p className="text-xs mt-[0.5px] text-[#5eb5f7] cursor-pointer">Set Emoji Status</p>
          </div>
          <FaChevronDown size={12} color="#708499" className=" cursor-pointer" />
        </div>
      </div>
      <hr style={{ borderColor: 'black' }} />
      <div className="mt-2">
        <ul className="space-y-1 cursor-pointer">
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            <div className="flex justify-center items-center gap-4">
              <RiGroupLine size={17} />
              <p>New Group</p>
            </div>
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            {" "}
            <RiGroupLine size={17} />
            <p>New Channel</p>
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            <BiSolidWalletAlt size={17} />
            <p>Wallet</p>
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            <FaRegCircleUser size={17} />
            Contact
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            <HiOutlinePhone size={17} />
            Calls
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            <MdOutlineSaveAlt size={17} />
            Saved Messages
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center">
            <IoSettingsOutline size={17} />
            Settings
          </li>
          <li className="hover:bg-[#232e3c] p-2 text-xs px-4 text-white flex gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <PiMoon size={17} />
              <p>Night Mode</p>
            </div>
            <ToggleSwitch isOn={isNightModeOn} handleToggle={handleNightModeToggle} onColor="bg-[#5eb5f7]" />
          </li>
        </ul>
      </div>
    </div>
  );
});

export default DropDown;
