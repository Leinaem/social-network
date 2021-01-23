import React from "react";
import { useSelector } from "react-redux";
import Avatar from "~/components/core/Avatar";

const TopBar = (props) => {
  const { handleDisconnect, handleModalProgilOpen } = props;
  const { userData } = useSelector((state) => state.userLogin);

  const renderBtn = () => {
    return (
      <div id="top-bar">
        <Avatar src={userData.photo.src} alt="profile-mini" size="40px" />
        <p>user name : {userData.userName}</p>
        <button onClick={() => handleDisconnect()}>Déconnection</button>
        <button onClick={() => handleModalProgilOpen(true)}>Profile</button>
      </div>
    );
  };

  return renderBtn();
};

export default TopBar;
