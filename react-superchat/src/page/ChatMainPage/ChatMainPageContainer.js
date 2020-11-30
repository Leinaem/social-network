import React, { useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import ChatMainPage from "./ChatMainPage";

const ChatMainPageContainer = (props) => {
  const pseudo = useSelector((state) => state.login.userData.userName);
  console.log('chat main Container page render')


  useEffect(() => {
    const socket = io.connect("http://localhost:82");

    socket.emit("newUser", pseudo);
  }, [pseudo]);

  return <ChatMainPage />;
};

export default React.memo(ChatMainPageContainer);
