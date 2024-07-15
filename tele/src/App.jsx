import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Info from "./componenets/info";
import ChatContext from "./componenets/ChatContext";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <Fragment>
      <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ChatContext.Provider>
    </Fragment>
  );
}

export default App;
