import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const TopBar = (props) => {
  const { handleDisconnect } = props;
  const { userData } = useSelector((state) => state.login);

  const renderBtn = () => {
    return (
      <Fragment>
        <p>{userData.userName}</p>
        <p>{userData.admin}</p>
        <button onClick={() => handleDisconnect()}>Déconnection</button>
      </Fragment>
    );
  };

  return renderBtn();
};

export default TopBar;
