import React from "react";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";

const ProfileForm = (props) => {
  const { userProfileUpdate, handleSubmit, submitBtn, register } = props;
  const { id: userId } = useSelector((state) => state.userLogin.userData);

  return (
    <form id="profileForm" onSubmit={handleSubmit(userProfileUpdate)}>
      <ProfileImage register={register} />
      <input type="hidden" value={userId} name="userId" />
      <button hidden ref={submitBtn}></button>
    </form>
  );
};

export default ProfileForm;
