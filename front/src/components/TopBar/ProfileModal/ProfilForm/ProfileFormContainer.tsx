import React, { useEffect } from "react";
import ProfileForm from "./ProfileForm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { setUserProfileImageData } from "../../../../redux/userProfileSlice";

export interface ProfileFormContainerProps {
  userProfileUpdate: Function;
  submitBtn: {current: HTMLButtonElement};
}

const ProfileFormContainer: React.FC<ProfileFormContainerProps> = (props) => {
  const { register, handleSubmit } = useForm();
  const { photo } = useAppSelector((state) => state.userLogin.userData);
  const { profileModalReadOnly: readOnly } = useAppSelector(
    (state) => state.userProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (photo?.type === "photo") {
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
