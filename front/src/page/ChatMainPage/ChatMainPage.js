import React, { Fragment } from "react";
import "./../../style.css";
import ChatBoxContainer from './ChatBoxContainer';

const ChatMainPage = () => {
  return (
    <Fragment>
      <div style={{ border: "1px solid red" }} id="connected-user"></div>
      <h1>Temps réel</h1>
      <ChatBoxContainer />
    </Fragment>
  );
};

export default React.memo(ChatMainPage);
