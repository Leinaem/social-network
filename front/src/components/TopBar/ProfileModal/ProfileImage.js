import React, { useState, useRef } from "react";
import DropArea from "./DropArea";
import composeRefs from "@seznam/compose-react-refs";

const ProfileImage = (props) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const { readOnly, register } = props;
  const inputFile = useRef(null);

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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  };

  return (
    <div>
      <DropArea
        loadImage={loadImage}
        inputFile={inputFile}
        readOnly={readOnly}
        setData={setData}
        data={data}
        err={err}
      />
      <input
        type="file"
        hidden={true}
        name="fileUpload"
        disabled={readOnly}
        ref={composeRefs(inputFile, register)}
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
