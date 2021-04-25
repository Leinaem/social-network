import React from "react";
import ChatBoxContainer from "./ChatBoxContainer";

const ChatMainPage: React.FC = () => {
  return (
    <>
      <h1>Canal de discussion.</h1>
      <ChatBoxContainer />
    </>
  );
};

export default React.memo(ChatMainPage);
