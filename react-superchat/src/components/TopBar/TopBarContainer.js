import React from "react";
import TopBar from "./TopBar";
import {
  setSocketConnectionAction,
  setSocketIdAction,
} from "./../../redux/Actions/socketActions";
import { setLogOut, isLoading } from "../../redux/Actions/user/LoginActions";
import { socket } from "./../../service/socket";
import { batch, useDispatch } from "react-redux";

const TopBarContainer = () => {
  const dispatch = useDispatch();

  const handleDisconnect = () => {
    socket.emit("logout");
    batch(() => {
      dispatch(isLoading(true));
      dispatch(setLogOut());
      dispatch(setSocketConnectionAction(false));
      dispatch(setSocketIdAction(""));
    });
  };

  return <TopBar handleDisconnect={handleDisconnect} />;
};

export default TopBarContainer;
