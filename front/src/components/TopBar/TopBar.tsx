import React from "react";
import Avatar from "../../components/core/Avatar";
import { useAppSelector } from '../../redux/hooks';

interface TopBarProps {
  handleModalProgilOpen: Function;
  handleDisconnect: Function;
}

const TopBar: React.FC<TopBarProps> = (props) => {
  const { handleDisconnect, handleModalProgilOpen } = props;
  const { userData } = useAppSelector((state) => state.userLogin);

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
