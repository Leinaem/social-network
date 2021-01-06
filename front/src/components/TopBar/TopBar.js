import React from "react";
import { useSelector } from "react-redux";

const TopBar = (props) => {
  const { handleDisconnect, handleModalProgilOpen } = props;
  const { userData } = useSelector((state) => state.userLogin);

  const renderBtn = () => {
    return (
      <div id="top-bar">
        <p>user name : {userData.userName}</p>
        <p>admin : {userData.admin}</p>
        <p>user id : {userData.id}</p>
        <button onClick={() => handleDisconnect()}>Déconnection</button>
        <button onClick={() => handleModalProgilOpen(true)}>Profile</button>
      </div>
    );
  };

  return renderBtn();
};

export default TopBar;
