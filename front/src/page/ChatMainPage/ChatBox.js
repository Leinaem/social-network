import React from "react";
import ChatBoxContent from "./ChatBoxContent";

const ChatBox = (props) => {
  const { setMessage, send, history, displayMessage } = props;

  return (
    <div id="chat-box">
      <ChatBoxContent history={history} displayMessage={displayMessage} />
      <div className="formContainer">
        <textarea
          autoFocus
          type="text"
          id="inputMessage"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          id="sendBtn"
          type="button"
          value="Envoyer"
          onClick={() => send()}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
