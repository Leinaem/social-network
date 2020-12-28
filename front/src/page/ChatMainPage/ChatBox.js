import React from 'react';

const ChatBox = (props) => {
  const { history, displayMessage } = props;

  return (
    <div id="chatBox">
      {history.map((item) => displayMessage(item))}
    </div>
  );
};

export default ChatBox;
