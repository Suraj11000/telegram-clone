import React, { Fragment, useContext } from "react";
import ChatContext from "./ChatContext";
import { IoIosSearch } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Message from "./message";

const Info = () => {
  const { selectedChat } = useContext(ChatContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();

    if (date.toDateString() === currentDate.toDateString()) {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = `${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;
      return strTime;
    } else {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  };

  return (
    <Fragment>
      <div
        className={`ml-[0.5px] sm:w-full ${
          selectedChat
            ? "h-full items-st justify-ce bg-[#17212b] hidden sm:block"
            : "h-f flex flex-col items-center justify-center bg-[#0e1621]"
        }`}
      >
        {selectedChat ? (
          <>
            <div className="text-white  flex justify-between py-2 px-4 sticky top-0 z-50 min-h-14 bg-[#17212b]">
              <div className=" cursor-pointer">
                <h2 className="text-sm">{selectedChat.creator.name}</h2>
                <p className="text-sm text-gray-400">
                  last seen {formatDate(selectedChat.updated_at)}
                </p>
              </div>
              <div className="flex justify-center items-center gap-4 cursor-pointer">
                <IoIosSearch size={20} className=" text-gray-500" />
                <MdLocalPhone size={20} className=" text-gray-500" />
                <FaRegUserCircle size={20} className=" text-gray-500" />
                <BsThreeDotsVertical size={20} className=" text-gray-500" />
              </div>
            </div>
            <Message chatId={selectedChat.id} />
          </>
        ) : (
          <div className="text-white bg-[#d6e8f70e] hidden sm:block p-1 rounded-full text-center">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Info;
