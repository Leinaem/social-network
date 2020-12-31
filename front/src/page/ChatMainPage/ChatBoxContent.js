import React from "react";

const ChatBoxContent = (props) => {
  const { history, displayMessage } = props;

  return (
    <div id="chat-box-content">
      {history.map((item) => displayMessage(item))}
    </div>
  );
};

export default ChatBoxContent;
