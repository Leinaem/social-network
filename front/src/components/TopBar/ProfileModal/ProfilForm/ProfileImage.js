import React, { useState, useRef } from "react";
import DropArea from "./DropArea";
import composeRefs from "@seznam/compose-react-refs";
import { useDispatch } from "react-redux";
import { setUserProfileImageData } from "./../../../../redux/Actions/user/ProfileActions";

const ProfileImage = (props) => {
  const [err, setErr] = useState(false);
  const { readOnly, register } = props;
  const inputFile = useRef(null);

  const dispatch = useDispatch();

  /**
   * add file to input file on drag and drop
   *
   * @param {object} file dropped image file
   * @return {object}
   */
  function FileListItems(file) {
    const b = new ClipboardEvent("").clipboardData || new DataTransfer();
    if (file) {
      b.items.add(file);
    }

    return b.files;
  }

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

    const profileInputFile = document.getElementById("fileUpload");
    // On drag and drop
    if (file in profileInputFile === false) {
      profileInputFile.files = new FileListItems(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (loadEvt) => {
      dispatch(setUserProfileImageData(loadEvt.target.result));
    };
  };

  return (
    <div>
      <DropArea
        FileListItems={FileListItems}
        loadImage={loadImage}
        inputFile={inputFile}
        readOnly={readOnly}
        err={err}
      />
      <input
        id="fileUpload"
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
