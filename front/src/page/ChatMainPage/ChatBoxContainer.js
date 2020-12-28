import React, { useState, useEffect } from "react";
import { socket } from "./../../service/socket";
import { useSelector } from "react-redux";
import ChatBox from './ChatBox';
import Message from './Message';

const ChatBoxContainer = () => {
  const { userName } = useSelector((state) => state.login.userData);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  /**
   * Save message to dbb
   * then emit to everyone
   *
   * @return {void}
   */
  const send = () => {
    if (message.trim().length) {
      const newMessage = {
        message,
        userName,
      };

      fetch("http://localhost:82/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
      .then((res) => res.json())
      .then((json) => {
        if ('err' in json === false) {
          const inputText = document.getElementById("inputMessage");
          inputText.value = "";
          socket.emit("addMessage", newMessage);
        } 
      })
    }
  };

  /**
   * Display chat message
   *
   * @param {object} item message data
   * @return {Component} Message component
   */
  const displayMessage = (item) => {
    return <Message data={item} key={item._id}/>
  }

  /**
   * Get history from dbb
   *
   * @return {void}
   */
  const fetchHistory = async () => {
    const history = await fetch("http://localhost:82/history");
    const result = await history.json();
    setHistory(result.history);
  };

  /**
   * Press enter event
   *
   * @param {event} e keyboard press event
   * @return {void}
   */
  const handleEnter = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      document.getElementById("sendBtn").click();
    }
  };
  
  /**
   * load/update history on component load or/and socket event
   */
  useEffect(() => {
    fetchHistory();

    socket.on('message', () => {
      fetchHistory();   
    });

    return () => {
      socket.off("message");
    };
  }, []);

  /**
   * Handle eventlistener on press Enter
   */
  useEffect(() => {
    document.addEventListener("keypress", handleEnter);

    return () => {
      document.removeEventListener('keypress', handleEnter)
    }
  }, [])

  return (
    <div className="chatContainer">
      <ChatBox history={history} displayMessage={displayMessage} />
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

export default React.memo(ChatBoxContainer);

// @toto, add this to package.json
// "proxy": "http://localhost:82",