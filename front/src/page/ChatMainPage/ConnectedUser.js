import React, { useEffect } from "react";
import { socket } from "./../../service/socket";

const ConnectedUser = () => {
  useEffect(() => {
    socket.on("newUser", (newUser) => {
      if (!document.getElementById(newUser.userId)) {
        const userListContainer = document.getElementById("connected-user");
        const newAvatar = document.createElement("img");
        newAvatar.setAttribute("width", "40px");
        newAvatar.setAttribute("height", "40px");
        newAvatar.setAttribute("alt", `${newUser.userName} avatar`);
        newAvatar.setAttribute("src", newUser.photo);
        newAvatar.setAttribute("id", newUser.userId);
        newAvatar.setAttribute("socket-id", newUser.socketId);
        newAvatar.setAttribute("user-name", newUser.userName);
        userListContainer.appendChild(newAvatar);
      }
    });

    socket.on("userLeft", (user) => {
      const userImg = document.getElementById(user.userId);
      if (userImg) {
        userImg.remove();
      }
    });

    return () => {
      socket.off("newUser");
      socket.off("userLeft");
    };
  }, []);

  return <div id="connected-user"></div>;
};

export default ConnectedUser;
