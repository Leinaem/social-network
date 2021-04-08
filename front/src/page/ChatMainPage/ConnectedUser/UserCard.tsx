import React from "react";
import Avatar from "../../../components/core/Avatar";

interface userCardProps {
  photo: string;
  userName: string;
}

const UserCard: React.FC<userCardProps> = (props) => {
  const { photo, userName } = props;

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
