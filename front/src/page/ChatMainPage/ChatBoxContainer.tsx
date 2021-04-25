import React, { useState, useEffect } from "react";
import { socket } from "../../service/socket";
import ConnectedUser from "./ConnectedUser";
import { useAppSelector } from "../../redux/hooks";
import ChatBox from "./ChatBox";
import Message from "./Message";
import { MessageDataProps } from './Message';

const ChatBoxContainer: React.FC = () => {
  const { userName, id: userId } = useAppSelector(
    (state) => state.userLogin.userData
  );
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<MessageDataProps[]>([]);

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
            const inputText = document.getElementById("inputMessage") as HTMLInputElement;
            inputText.value = "";
            setMessage("");
            socket.emit("addMessage", newMessage);
          }
        });
    }
  };

  const displayMessage = (item: MessageDataProps, key: number) => {
    const author = item.userId === userId ? "self" : "other";

    return (
      <Message data={item} key={item._id ? item._id : key} author={author} />
    );
  };

  const fetchHistory = async () => {
    const history = await fetch("/history");
    const result = await history.json();
    setHistory(result.history);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      e.preventDefault();
      const inputText = document.getElementById("inputMessage") as HTMLInputElement;

      // compare focus and text area
      if (document.activeElement !== inputText) {
        return false;
      }

      if (e.shiftKey) {
        const caret: number|null = inputText?.selectionStart;
        inputText.value = `${inputText.value.substring(
          0,
          caret as number
        )}\n${inputText.value.substring(caret as number, inputText.value.length)}`;
        e.stopPropagation();
        setMessage(inputText.value);
      } else {
        document.getElementById("sendBtn")?.click();
      }
    } else {
      return false;
    }
  };

  /**
   * load/update history on component load or/and socket event
   */
  useEffect(() => {
    fetchHistory();

    socket.on("message", (messageInc: MessageDataProps) => {
      setHistory((history: MessageDataProps[]) => [...history, messageInc]);
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
