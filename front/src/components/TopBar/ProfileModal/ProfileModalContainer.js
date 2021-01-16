import React from "react";
import { fetchCurrentUser } from "../../../redux/Actions/user/LoginActions";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  setUserProfileModalReadOnly,
  setUserProfileImageError,
  setProfilModalOpen,
} from "../../../redux/Actions/user/ProfileActions";
import ProfileModal from "./ProfileModal";

const ProfileModalContainer = () => {
  const { profilModalOpen, profileEdited } = useSelector(
    (state) => state.userProfile
  );
  const { id } = useSelector((state) => state.userLogin.userData);
  const dispatch = useDispatch();

  /**
   * manage modal close
   *
   * @return {void}
   */
  const handleModalClose = () => {
    batch(() => {
      dispatch(setProfilModalOpen(false));
      dispatch(setUserProfileImageError(false));
      dispatch(setUserProfileModalReadOnly(true));
    });
  };

  /**
   * update profile
   *
   * @return {void}
   */
  const userProfileUpdate = async () => {
    const totoForm = document.getElementById("profileForm");
    const formData = new FormData(totoForm);

    if (profileEdited) {
      await fetch("http://localhost:82/userupdate", {
        method: "POST",
        body: formData,
      })
        .then(() => {
          dispatch(fetchCurrentUser(id));
        })
        .catch((err) => console.log(err));
    }

    handleModalClose();
  };

  return (
    <ProfileModal
      open={profilModalOpen}
      onClose={handleModalClose}
      userProfileUpdate={userProfileUpdate}
    />
  );
};

export default React.memo(ProfileModalContainer);
