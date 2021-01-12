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

  const userProfileUpdate = async (data) => {
    // handleModalClose();
    // setReadOnly(true);
    console.log("SAVE DATA");
    console.log(data);
    const totoForm = document.getElementById("profileForm");
    const formData = new FormData(totoForm);

    fetch("http://localhost:82/userupdate", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
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
