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
   * Socket Login
   */
  useEffect(() => {
    const { userName, admin, id } = userData;

    socket.emit("login", {
      userId: id,
      userName,
      admin,
    });
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
