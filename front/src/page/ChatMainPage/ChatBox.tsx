import React from "react";
import Button from "../../components/core/Button";
import ChatBoxContent from "./ChatBoxContent";

interface ChatBoxProps {
  displayMessage: Function;
  history: Array<Object>;
  send: Function;
  setMessage: Function;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { setMessage, send, history, displayMessage } = props;

  return (
    <div id="chat-box">
      <ChatBoxContent history={history} displayMessage={displayMessage} />
      <div className="formContainer">
        <textarea
          autoFocus
          id="inputMessage"
          aria-label="Message"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <Button
          id="sendBtn"
          type="button"
          value="Envoyer"
          onClick={() => send()}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;