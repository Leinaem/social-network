import React, { Fragment } from "react";
import TopBar from "./TopBar";
import {
  setSocketConnectionAction,
  setSocketIdAction,
} from "./../../redux/Actions/socketActions";
import { setLogOut, isLoading } from "../../redux/Actions/user/LoginActions";
import { socket } from "./../../service/socket";
import { batch, useDispatch } from "react-redux";
import { setProfilModalOpen } from "../../redux/Actions/user/ProfileActions";
import ProfilModal from "./ProfileModal";

const TopBarContainer = () => {
  const dispatch = useDispatch();

  const handleModalProgilOpen = (open) => {
    dispatch(setProfilModalOpen(open));
  };

  const handleDisconnect = () => {
    socket.emit("logout");
    batch(() => {
      dispatch(isLoading(true));
      dispatch(setLogOut());
      dispatch(setSocketConnectionAction(false));
      dispatch(setSocketIdAction(""));
    });
  };

  return (
    <Fragment>
      <TopBar
        handleDisconnect={handleDisconnect}
        handleModalProgilOpen={handleModalProgilOpen}
      />
      <ProfilModal />
    </Fragment>
  );
};

export default React.memo(TopBarContainer);
