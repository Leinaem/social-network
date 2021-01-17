import React, { useEffect } from "react";
import ProfileForm from "./ProfileForm";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfileImageData } from "@redux/Actions/user/ProfileActions";

const ProfileFormContainer = (props) => {
  const { register, handleSubmit } = useForm();
  const { photo } = useSelector((state) => state.userLogin.userData);
  const { profileModalReadOnly: readOnly } = useSelector(
    (state) => state.userProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (photo) {
      dispatch(
        setUserProfileImageData(
          `http://localhost:82/uploads/images/profile/${photo}`
        )
      );
    } else {
      dispatch(setUserProfileImageData(null));
    }
  }, [readOnly, photo, dispatch]);

  return (
    <ProfileForm register={register} handleSubmit={handleSubmit} {...props} />
  );
};

export default ProfileFormContainer;
