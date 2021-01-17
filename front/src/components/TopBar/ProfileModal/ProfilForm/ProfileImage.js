import React, { useRef } from "react";
import DropArea from "./DropArea";
import composeRefs from "@seznam/compose-react-refs";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  setUserProfileImageData,
  setUserProfileImageError,
  setUserProfileEdited,
} from "@redux/Actions/user/ProfileActions";

const ProfileImage = (props) => {
  const { register } = props;
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const { profileModalReadOnly: readOnly } = useSelector(
    (state) => state.userProfile
  );

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

  /**
   * Control file type, size then dispatch error or add file in data input
   * @param {object} file image data
   * @return  {false | void} false if error found
   */
  const loadImage = (file) => {
    if (!file) {
      return false;
    }
    const { size, type } = file;
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!fileTypes.includes(type)) {
      dispatch(
        setUserProfileImageError("Veuillez insérer une image (jpg, jpeg, png)")
      );
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      dispatch(setUserProfileImageError("Taille maximum autorisée : 2M"));
      return false;
    }

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

    batch(() => {
      dispatch(setUserProfileImageError(false));
      dispatch(setUserProfileEdited(true));
    });
  };

  return (
    <div>
      <DropArea
        FileListItems={FileListItems}
        loadImage={loadImage}
        inputFile={inputFile}
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
