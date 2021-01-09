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

  return (
    <ProfileModal
      open={profilModalOpen}
      onClose={handleModalClose}
      readOnly={readOnly}
      setReadOnly={setReadOnly}
    />
  );
};

export default React.memo(ProfileModalContainer);
