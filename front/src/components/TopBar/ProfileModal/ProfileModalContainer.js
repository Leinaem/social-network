import React from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { fetchCurrentUser } from "../../../redux/lib";
import ProfileModal from "./ProfileModal";
import {
  setUserProfileModalReadOnly,
  setUserProfileImageError,
  setProfilModalOpen,
} from "../../../redux/userProfileSlice";

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
    const form = document.getElementById("profileForm");
    const formData = new FormData(form);

    if (profileEdited) {
      await fetch("/userupdate", {
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
