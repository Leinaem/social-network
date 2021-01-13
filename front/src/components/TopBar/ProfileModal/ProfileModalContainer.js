import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { setProfilModalOpen } from "../../../redux/Actions/user/ProfileActions";

import { fetchCurrentUser } from "../../../redux/Actions/user/LoginActions";

const ProfileModalContainer = () => {
  const { profilModalOpen } = useSelector((state) => state.userProfile);
  const { id } = useSelector((state) => state.userLogin.userData);
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setProfilModalOpen(false));
  };

  const userProfileUpdate = async () => {
    const totoForm = document.getElementById("profileForm");
    const formData = new FormData(totoForm);

    fetch("http://localhost:82/userupdate", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        dispatch(fetchCurrentUser(id));
        handleModalClose();
        setReadOnly(true);
      })
      .catch((err) => console.log(err));
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
