// ToggleSwitch.js
import React from 'react';

const ToggleSwitch = ({ isOn, handleToggle, onColor }) => {
  return (
    <div onClick={handleToggle} className="flex items-center cursor-pointer">
      <div
        className={`w-7 h-3 flex items-center ${isOn ? onColor : 'bg-gray-300'} rounded-full`}
        style={{ justifyContent: isOn ? 'flex-end' : 'flex-start' }}
      >
        <div className=" bg-gray-800 w-4 h-4 rounded-full border-[#5eb5f7] border-2 shadow-md transform transition-transform duration-300 ease-in-out"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
