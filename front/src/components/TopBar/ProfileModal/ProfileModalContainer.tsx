import React from "react";
import { fetchCurrentUser } from "../../../redux/lib";
import { useAppSelector } from '../../../redux/hooks';
import { useDispatch, batch } from "react-redux";
import ProfileModal from "./ProfileModal";
import {
  setUserProfileModalReadOnly,
  setUserProfileImageError,
  setProfilModalOpen,
} from "../../../redux/userProfileSlice";

const ProfileModalContainer: React.FC = () => {
  const {
    profilModalOpen,
    profileEdited
  } = useAppSelector((state) => state.userProfile);

  const { id } = useAppSelector((state) => state.userLogin.userData);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    batch(() => {
      dispatch(setProfilModalOpen(false));
      dispatch(setUserProfileImageError(false));
      dispatch(setUserProfileModalReadOnly(true));
    });
  };

  const userProfileUpdate = async () => {
    const form = document.getElementById("profileForm") as HTMLFormElement;
    const formData = new FormData(form);

    if (profileEdited) {
      await fetch("/userupdate", {
        method: "POST",
        body: formData,
      })
        .then(() => {
          if (id) {
            dispatch(fetchCurrentUser(id));
          }
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
