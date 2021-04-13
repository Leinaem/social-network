import React, { useEffect } from "react";
import ProfileForm from "./ProfileForm";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfileImageData } from "../../../../redux/userProfileSlice";

const ProfileFormContainer = (props) => {
  const { register, handleSubmit } = useForm();
  const { photo } = useSelector((state) => state.userLogin.userData);
  const { profileModalReadOnly: readOnly } = useSelector(
    (state) => state.userProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (photo.type === "photo") {
      dispatch(setUserProfileImageData(`${photo.src}`));
    } else {
      dispatch(setUserProfileImageData(null));
    }
  }, [readOnly, photo, dispatch]);

  return (
    <ProfileForm register={register} handleSubmit={handleSubmit} {...props} />
  );
};

export default ProfileFormContainer;
