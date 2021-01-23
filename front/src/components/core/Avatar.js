import React, { useState } from "react";

const Avatar = (props) => {
  const { size, src, alt } = props;
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
    <div className="avatar-container" style={{ width: size, height: size }}>
      {displayImage()}
    </div>
  );
};

export default React.memo(Avatar);
