import React, { useState, useEffect, useRef, useContext } from "react";
import UserProfilePhoto from "./userProfile";
import ChatContext from "./ChatContext";

const ChatList = () => {
    const { setSelectedChat } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(400); // Initial width
  const [activeChatId, setActiveChatId] = useState(null); // State to manage active chat
  const resizeRef = useRef(null);
  const isResizing = useRef(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.data)) {
          setChats(data.data.data);
        } else {
          throw new Error("Invalid data format from API");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isResizing.current) {
        setWidth(event.clientX - resizeRef.current.getBoundingClientRect().left);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleChatClick = (chat) => {
    setActiveChatId(chat.id === activeChatId ? null : chat.id); // Toggle active chat
    setSelectedChat(chat); // Update the selected chat in the context
  };

  // Function to format date based on proximity to current date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today: show time with AM/PM in capital letters
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
      return strTime;
    } else if (diffDays < 5) {
      // Day name short form (e.g., Mon, Tue)
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      // Before 5 days, show date in format 7/5/2024
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return strTime;
  };

  const isActiveChat = (chatId) => {
    return chatId === activeChatId;
  };

  return (
    <div className="bg-[#17212b]  max-w-[69rem] overflow-hidden">
      <div
        ref={resizeRef}
        className="relative"
        style={{ width: `${width}px` }}
      >
        <div className="">
          <div className="overflow-y-auto">
            {loading ? (
              <p className="text-gray-600 text-center mt-8">Loading...</p>
            ) : (
              <ul className="">
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className={`px-3 p-2 max-w-[69rem]  flex items-center space-x-4 hover:bg-[#d6e8f70e] cursor-pointer ${
                      isActiveChat(chat.id) ? 'bg-[#5eb5f76c]' : ''
                    }`}
                    onClick={() => handleChatClick(chat)} // Pass the entire chat object
                  >
                    <div className="flex-shrink-0">
                      {chat.creator && chat.creator.name && (
                        <UserProfilePhoto
                          firstName={chat.creator.name.split(" ")[0]}
                          lastName={chat.creator.name.split(" ")[1]}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-white text-sm">
                          {chat.creator.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(chat.updated_at).toDateString() === new Date().toDateString()
                            ? formatTime(chat.updated_at)
                            : formatDate(chat.updated_at)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400">message</p>
                        <p className="text-xs text-white bg-[#5eb5f7] rounded-full w-5 h-5 flex justify-center items-center">
                          {chat.msg_count}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div
          className="absolute top-0 right-0 h-full w-2 cursor-col-resize"
          onMouseDown={() => (isResizing.current = true)}
        >
          <span className="block h-full" />
        </div>
      </div>
    </div>
  );
};

export default ChatList;