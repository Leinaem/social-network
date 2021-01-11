import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { setProfilModalOpen } from "../../../redux/Actions/user/ProfileActions";

const ProfileModalContainer = () => {
  const { profilModalOpen } = useSelector((state) => state.userProfile);
  const [readOnly, setReadOnly] = useState(false);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setProfilModalOpen(false));
  };

  const userProfileUpdate = (data) => {
    handleModalClose();
    setReadOnly(true);
    console.log("SAVE DATA");
    console.log(data);
  };

  return (
    <ProfileModal
      open={profilModalOpen}
      onClose={handleModalClose}
      readOnly={readOnly}
      setReadOnly={setReadOnly}
      userProfileUpdate={userProfileUpdate}
    />
  );
};

export default React.memo(ProfileModalContainer);
