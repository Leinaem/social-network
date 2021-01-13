import React from "react";
import ProfileForm from "./ProfileForm";
import { useForm } from "react-hook-form";

const ProfileFormContainer = (props) => {
  const { register, handleSubmit } = useForm();

  return (
    <ProfileForm register={register} handleSubmit={handleSubmit} {...props} />
  );
};

export default ProfileFormContainer;
