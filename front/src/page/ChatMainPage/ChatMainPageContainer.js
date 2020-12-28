import React, { useEffect } from "react";
import { socket } from "./../../service/socket";
import { batch, useDispatch, useSelector } from "react-redux";
import ChatMainPage from "./ChatMainPage";
import {
  setSocketConnectionAction,
  setSocketIdAction,
} from "./../../redux/Actions/socketActions";

const ChatMainPageContainer = () => {
  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  /**
   * Socket Connect / Disconnect
   */
  useEffect(() => {
    const { userName, admin } = userData;

    socket.emit("login", {
      userName,
      admin,
    });

    socket.on("newUser", (newUser) => {
      const userListContainer = document.getElementById("connected-user");
      const newAvatar = document.createElement("img");
      newAvatar.setAttribute("src", newUser.avatar);
      newAvatar.setAttribute("id", newUser.id);
      newAvatar.setAttribute("user-name", newUser.userName);
      userListContainer.appendChild(newAvatar);
    });

    socket.on("userLeft", (user) => {
      const userImg = document.getElementById(user.id);
      if (userImg) {
        userImg.remove();
      }
    });

    return () => {
      socket.off("newUser");
      socket.off("userLeft");
    };
  }, [userData]);

  useEffect(() => {
    socket.on("connected", (socketId) => {
      batch(() => {
        dispatch(setSocketConnectionAction(true));
        dispatch(setSocketIdAction(socketId));
      });
    });

    return () => {
      socket.off("connected");
    };
  }, [dispatch]);

  return <ChatMainPage />;
};

export default React.memo(ChatMainPageContainer);
