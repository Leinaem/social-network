import React from "react";
import { useSelector } from "react-redux";

const TopBar = (props) => {
  const { handleDisconnect } = props;
  const { userData } = useSelector((state) => state.login);

  const renderBtn = () => {
    return (
      <div id="top-bar">
        <p>{userData.userName}</p>
        <p>{userData.admin}</p>
        <button onClick={() => handleDisconnect()}>Déconnection</button>
      </div>
    );
  };

  return renderBtn();
};

export default TopBar;
