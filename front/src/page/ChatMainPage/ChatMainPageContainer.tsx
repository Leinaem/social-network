import React, { useEffect } from "react";
import { useAppSelector } from '../../redux/hooks';
import { batch, useDispatch } from "react-redux";
import { socket } from "../../service/socket";
import ChatMainPage from "./ChatMainPage";
import {
  setSocketConnectionAction,
  setSocketIdAction,
} from "../../redux/socketSlice";

const ChatMainPageContainer: React.FC = () => {
  const { userData } = useAppSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  /**
   * Socket Login
   */
  useEffect(() => {
    const { userName, admin, id, photo } = userData;

    socket.emit("login", {
      userId: id,
      userName,
      admin,
      photo: photo?.src,
    });
  }, [userData]);

  useEffect(() => {
    socket.on("connected", (socketId: string) => {
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
