import React, { Fragment } from "react";
import ChatBoxContainer from "./ChatBoxContainer";

const ChatMainPage = () => {
  return (
    <Fragment>
      <h1>Canal de discussion.</h1>
      <ChatBoxContainer />
    </Fragment>
  );
};

export default React.memo(ChatMainPage);
