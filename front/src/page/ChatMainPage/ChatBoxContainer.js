import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../../service/socket";
import ChatBox from './ChatBox';

const ChatBoxContainer = () => {
  console.log('load chat box container');
  const { userName } = useSelector((state) => state.login.userData);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

    /**
   * Send message to everyone
   */
  const send = () => {
    if (message.trim().length) {
      const newMessage = {
        message,
        userName,
      };
      socket.emit("addMessage", newMessage);
      console.log("send message");
      const inputText = document.getElementById("inputMessage");
      inputText.value = "";
      // insertMessage("self", null);

      return false;
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await fetch("http://localhost:82/history");
      const result = await history.json();
      setHistory(result.history);
    };

    fetchHistory();
  }, []);

  return (
    <div className="chatContainer">
      <ChatBox history={history} />
      <div className="formContainer">
        <textarea
          type="text"
          id="inputMessage"
          autoFocus
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

export default React.memo(ChatBoxContainer);
