import React from "react";

interface ChatBoxContentProps {
  displayMessage: Function;
  history: Array<Object>;
}

const ChatBoxContent: React.FC<ChatBoxContentProps> = (props) => {
  const { history, displayMessage } = props;

  return (
    <div id="chat-box-content">
      {history.map((item, key) => displayMessage(item, key))}
    </div>
  );
};

export default ChatBoxContent;
