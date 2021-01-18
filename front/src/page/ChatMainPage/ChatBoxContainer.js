import React, { useState, useEffect } from "react";
import { socket } from "./../../service/socket";
import ConnectedUser from "./ConnectedUser";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import Message from "./Message";

const ChatBoxContainer = () => {
  const { userName, id: userId } = useSelector(
    (state) => state.userLogin.userData
  );
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
        userId,
        edited: false,
        createdAt: new Date(Date.now()),
      };

      fetch("/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
        .then((res) => res.json())
        .then((json) => {
          if ("err" in json === false) {
            const inputText = document.getElementById("inputMessage");
            inputText.value = "";
            setMessage("");
            socket.emit("addMessage", newMessage);
          }
        });
    }
  };

  /**
   * Display chat message
   *
   * @param {object} item message data
   * @return {Component} Message component
   */
  const displayMessage = (item, key) => {
    const author = item.userId === userId ? "self" : "other";

    return (
      <Message data={item} key={item._id ? item._id : key} author={author} />
    );
  };

  /**
   * Get history from dbb
   *
   * @return {void}
   */
  const fetchHistory = async () => {
    const history = await fetch("/history");
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

    socket.on("message", (messageInc) => {
      setHistory((history) => [...history, messageInc]);
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
      document.removeEventListener("keypress", handleEnter);
    };
  }, []);

  return (
    <div id="chat-box-container">
      <ChatBox
        setMessage={setMessage}
        send={send}
        history={history}
        displayMessage={displayMessage}
      />
      <ConnectedUser />
    </div>
  );
};

export default React.memo(ChatBoxContainer);
