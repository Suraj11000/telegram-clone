import React from 'react';
import { useLocation } from 'react-router-dom';

const ChatDetails = () => {
  const { state } = useLocation();
  const { chat } = state;

  return (
    <div>
      <h2>{chat.creator.name}</h2>
      <p>{new Date(chat.updated_at).toLocaleString()}</p>
      {/* Add additional chat details here */}
    </div>
  );
};

export default ChatDetails;