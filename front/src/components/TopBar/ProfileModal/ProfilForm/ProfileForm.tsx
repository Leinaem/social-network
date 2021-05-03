import React from "react";
import ProfileImage from "./ProfileImage";
import { useAppSelector } from "../../../../redux/hooks";
import { ProfileFormContainerProps } from './ProfileFormContainer';

interface ProfileFormProps extends ProfileFormContainerProps {
  handleSubmit: Function;
  register: Function;
}

const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const { userProfileUpdate, handleSubmit, submitBtn, register } = props;
  const { id: userId } = useAppSelector((state) => state.userLogin.userData);

  return (
    <form id="profileForm" onSubmit={handleSubmit(userProfileUpdate)}>
      <ProfileImage register={register} />
      <input type="hidden" value={userId} name="userId" />
      <button hidden ref={submitBtn}></button>
    </form>
  );
};

export default ProfileForm;
