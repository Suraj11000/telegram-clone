import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import { TiAttachmentOutline } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa6";
import { PiMicrophone } from "react-icons/pi";
import UserProfilePhoto from "./userProfile";
import { FaRegFaceSmile } from "react-icons/fa6";
import "./custom.css"; // Import the custom CSS

const Message = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        if (data && data.data && Array.isArray(data.data)) {
          setMessages(data.data);
        } else {
          throw new Error("Invalid data format from API");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const messageElements = scrollRef.current.querySelectorAll(".message-item");
      if (!messageElements || messageElements.length === 0) return;

      let lastDate = "";
      messageElements.forEach((element) => {
        const messageDate = element.getAttribute("data-date");
        if (messageDate && messageDate !== lastDate) {
          lastDate = messageDate;
          setCurrentDate(messageDate);

          setShowDate(true);
          setTimeout(() => {
            setShowDate(false);
          }, 2000);
        }
      });

      setScrollbarVisible(true);
      setTimeout(() => {
        setScrollbarVisible(false);
      }, 2000);
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Fragment>
    <div className={`min-h-minus-20px flex flex-col bg-[#0e1621] ${scrollbarVisible ? "scrollbar-visible" : ""}`} ref={scrollRef}>
      {showDate && (
        <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded-md absolute top-0 left-1/2 transform -translate-x-1/2 mt-2">
          {formatDate(currentDate)}
        </div>
      )}
      <div className="flex-grow overflow-y-auto p-4 min-h-minus-30px">
        {loading ? (
          <p className="text-gray-600 text-center mt-8">Loading...</p>
        ) : (
          messages.map((message, index) => (
            <div key={message.id} className="py-1 flex message-item" data-date={message.created_at.split('T')[0]}>
              <div className="flex items-end cursor-pointer">
                <UserProfilePhoto
                  firstName={
                    message.sender.name
                      ? message.sender.name.split(" ")[0]
                      : "N"
                  }
                  size="message"
                  lastName={
                    message.sender.name ? message.sender.name.split(" ")[1] : ""
                  }
                />
              </div>
              <div
                className={`ml-2 p-1 px-3 max-w-[25rem] flex ${
                  message.sender.name === "BeyondChat"
                    ? "bg-[#5eb5f76c] text-white"
                    : "bg-[#182533] text-white"
                } rounded-2xl rounded-bl-none`}
              >
                <p className="text-xs cursor-pointer">
                  {message.message}{" "}
                  <span className="text-gray-400 flex-col ml-4 items-end">
                    {formatTime(message.created_at)}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
        <div className="w-full">
          <FaChevronDown size={35} color="white" className=" cursor-pointer p-2 rounded-full bg-[#1d2b3a] absolute bottom-16 right-6"/>
          <p className=" text-xs cursor-pointer text-white bg-[#5eb5f7] absolute bottom-[5.8rem] right-8 p-2 rounded-full w-5 h-5 flex justify-center items-center">50</p>
          <p className=" absolute cursor-pointer top-16 ml-[12.5rem] text-white text-sm rounded-2xl bg-[#141f2ba4] px-3">July 14</p>
        </div>
      </div>
      <div className="mt-auto flex items-center bg-[#17212b] px-2 py-2">
        <TiAttachmentOutline size={20} className="text-gray-400 cursor-pointer" />
        <input
          placeholder="write a message..."
          type="text"
          className="bg-[#17212b] text-white placeholder-gray-500 px-4 py-2 w-full focus:outline-none"
        />
        <div className="flex gap-4 cursor-pointer">
          <PiMicrophone size={20} className="text-gray-400" />
          <FaRegFaceSmile size={20} className="text-gray-400"/>
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default Message;
