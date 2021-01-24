import React from "react";
import Avatar from "~/components/core/Avatar";

const UserCard = (props) => {
  const { photo, userName } = props.userData;

  return (
    <div className="user-card">
      <div className="avatar-container">
        <Avatar size="80px" src={photo} alt={`avatar ${userName}`} />
      </div>
      <h2>{userName}</h2>
    </div>
  );
};

export default UserCard;
