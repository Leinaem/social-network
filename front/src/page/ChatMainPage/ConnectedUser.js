import React, { useEffect } from "react";
import { socket } from "./../../service/socket";

const ConnectedUser = () => {
  useEffect(() => {
    socket.on("newUser", (newUser) => {
      if (!document.getElementById(newUser.userId)) {
        const userListContainer = document.getElementById("connected-user");
        const newAvatar = document.createElement("img");
        newAvatar.setAttribute("src", newUser.avatar);
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
