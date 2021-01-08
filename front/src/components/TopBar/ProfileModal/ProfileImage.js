import React, { useState } from "react";
import DropArea from "./DropArea";

const ProfileImage = (props) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const { readOnly } = props

  const loadImage = (file) => {
    const { size, type } = file;
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    console.log(type)
    console.log(size)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  };

  return (
    <div>
      <DropArea data={data} setData={setData} loadImage={loadImage} err={err} readOnly={readOnly} />
      <input
        type="file"
        hidden={readOnly}
        name="fileUpload"
        // ref={fileInputRef}
        accept=".png,.jpg,.jpeg"
        onChange={({
          target: {
            validity,
            files: [file],
          },
        }) => {
          if (validity.valid) {
            loadImage([file][0]);
          }

          return null;
        }}
      />
    </div>
  );
};

export default ProfileImage;
