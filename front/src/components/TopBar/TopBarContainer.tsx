import React, { Fragment } from "react";
import { setLogOut, isLoading } from "../../redux/loginSlice";
import { setProfilModalOpen } from "../../redux/userProfileSlice";
import { batch, useDispatch } from "react-redux";
import { socket } from "../../service/socket";
import ProfilModal from "./ProfileModal";
import {
  setSocketConnectionAction,
  setSocketIdAction,
} from "../../redux/socketSlice";
import TopBar from "./TopBar";

const TopBarContainer: React.FC = () => {
  const dispatch = useDispatch();

  const handleModalProgilOpen = (open: boolean) => {
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