import React from "react";

const ChatBoxContent = (props) => {
  const { history, displayMessage } = props;

  return (
    <div id="chat-box-content">
      {history.map((item, key) => displayMessage(item, key))}
    </div>
  );
};

export default ChatBoxContent;
