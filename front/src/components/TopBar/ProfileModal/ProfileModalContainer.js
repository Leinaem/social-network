import React from "react";
import ProfileModal from "./ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { setProfilModalOpen } from "../../../redux/Actions/user/ProfileActions";

const ProfileModalContainer = () => {
  const { profilModalOpen } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setProfilModalOpen(false));
  };

  return <ProfileModal open={profilModalOpen} onClose={handleModalClose} />;
};

export default React.memo(ProfileModalContainer);
