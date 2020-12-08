import React, {
  Fragment,
  // useEffect,
  // useState
} from "react";
import "./../../style.css";
// import io from "socket.io-client";
// import { useSelector } from "react-redux";

const ChatMainPage = () => {
  // console.log('chat main page render')
  // let socket = io.connect("http://localhost:82");
  // const pseudo = useSelector((state) => state.login.userData.userName);
  // const [message, setMessage] = useState("");

  // /**
  //  * Add message in chat box
  //  * @param {string} type
  //  * @param {string} messageReceived
  //  *
  //  */
  // const insertMessage = (type, messageToInsert) => {
  //   // create message container
  //   const newContainer = document.createElement("div");
  //   newContainer.classList.add("messageContainer");
  //   if (type === "self") {
  //     newContainer.classList.add("align-right");
  //   }
  //   // create message
  //   const newMessage = document.createElement("span");
  //   newMessage.classList.add("message");
  //   newMessage.classList.add(type);
  //   newMessage.innerHTML =
  //     type === "self" && message.length ? message : messageToInsert;
  //   newContainer.appendChild(newMessage);
  //   const chatBox = document.getElementById("chatBox");

  //   chatBox.appendChild(newContainer);
  //   chatBox.scrollTop = chatBox.scrollHeight;
  //   setMessage("");
  //   document.getElementById("inputMessage").focus();
  // };

  // /**
  //  * Insert history messages
  //  * @param {Array} docs last messages
  //  * @return {void}
  //  */
  // const insertHistory = (docs) => {
  //   docs.map((mess) => {
  //     let messageToInsert = mess.message;
  //     const type = mess.name === pseudo ? "self" : "other";

  //     if ("name" in mess && mess.name !== pseudo) {
  //       messageToInsert = `${mess.name} : ${messageToInsert}`;
  //     }

  //     return insertMessage(type, messageToInsert);
  //   });
  // };

  // /**
  //  * set message value
  //  * @param {event} e event
  //  * @return {void}
  //  */
  // const handleInputChange = (e) => {
  //   setMessage(e.target.value);
  // };

  // /**
  //  * Send message to everyone
  //  */
  // const send = () => {
  //   if (message.trim().length) {
  //     const newMessage = {
  //       message,
  //       pseudo,
  //     };
  //     socket.emit("newMessage", newMessage);
  //     console.log("send message");
  //     const inputText = document.getElementById("inputMessage");
  //     inputText.value = "";
  //     insertMessage("self", null);

  //     return false;
  //   }
  // };

  // /**
  //  * Check keypress for Enter
  //  * @param {event} e keypress event
  //  * @return {void}
  //  */
  // const handleEnter = (e) => {
  //   if (e.code === "Enter") {
  //     e.preventDefault();
  //     document.getElementById("sendBtn").click();
  //   }
  // };

  // useEffect(() => {
  //   // user connect
  //   socket.emit("newUser", pseudo);

  //   // New other user connect
  //   socket.on("newUser", (pseudo) => {
  //     insertMessage("robot", `${pseudo} vient de se connecter`);
  //   });

  //   // Receive broadcast message
  //   socket.on("message", (newMessage) => {
  //     console.log("message recu");
  //     console.log(newMessage);
  //     if (newMessage.pseudo !== pseudo) {
  //       insertMessage("other", newMessage);
  //     }
  //   });

  //   document.addEventListener("keypress", handleEnter);
  // }, []);

  // useEffect(() => {
  //   // Receive history after log in
  //   socket.on("history", (docs) => {
  //     insertHistory(docs);
  //   });
  // }, []);

  return (
    <Fragment>
      <div style={{ border: "1px solid red" }} id="connected-user"></div>
      <h1>Temps réel</h1>
      <div className="chatContainer">
        <div id="chatBox"></div>
        <div className="formContainer">
          <textarea
            type="text"
            id="inputMessage"
            autoFocus
            // onChange={(e) => handleInputChange(e)}
          ></textarea>
          <button
            id="sendBtn"
            type="button"
            value="Envoyer"
            // onClick={() => send()}
          >
            Envoyer
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMainPage;
