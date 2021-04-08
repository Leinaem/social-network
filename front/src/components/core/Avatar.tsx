import React, { useState } from "react";

interface avatarProps {
  size?: string;
  src: string;
  alt: string;
  userId?: string;
  handleClick?: Function;
  setOpenedPopoverId?: Function;
}

const Avatar: React.FC<avatarProps> = (props) => {
  const { size, src, alt, userId, handleClick, setOpenedPopoverId } = props;
  const [orientation, setOrientation] = useState("vertical");

  const displayImage = () => {
    const img = new Image();

    img.onload = async () => {
      if (img.width > img.height) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    };

    img.src = src;

    return (
      <img
        src={src}
        alt={alt}
        style={
          orientation === "vertical" ? { width: "100%" } : { height: "100%" }
        }
      />
    );
  };

  return (
    <div
      id={userId}
      className="avatar-container"
      style={{ width: size, height: size }}
      onClick={(e) => {
        if (handleClick && setOpenedPopoverId) {
          setOpenedPopoverId(userId);
          handleClick(e.currentTarget);
        }
      }}
    >
      {displayImage()}
    </div>
  );
};

export default React.memo(Avatar);
