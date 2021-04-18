import React from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useSelector, useDispatch, batch } from "react-redux";
import Placeholder from "@image/profile-placeholder.png";
import {
  setUserProfileImageData,
  setUserProfileEdited,
} from "../../../../redux/userProfileSlice";

interface dropAreaProps {
  loadImage: any;
  inputFile: any;
  FileListItems: any;
}

const DropArea: React.FC<dropAreaProps> = (props) => {
  const { loadImage, inputFile, FileListItems } = props;
  const {
    tempProfileImageData,
    profileImageError: err,
    profileModalReadOnly: readOnly,
  } = useSelector((state: any) => state.userProfile);
  const dispatch = useDispatch();

  /**
   * On drop image on area
   */
  const handleOnDrop = (e: any): void | false => {
    e.preventDefault();
    if (readOnly) {
      return false;
    }
    const {
      dataTransfer: { files },
    } = e;
    const { length } = files;
    if (length === 0) {
      return false;
    }

    dispatch(setUserProfileImageData(""));
    loadImage(files[0]);
  };

  /**
   * Drag over event
   *
   * @param {Event} e drop event
   * @return {void}
   */
  const handleOnDragOver = (e: any) => {
    e.preventDefault();
  };

  /**
   * remove imgage from input field
   *
   * @return {void}
   */
  const onRemove = () => {
    const profileInputFile = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    profileInputFile.files = new FileListItems(null);
    batch(() => {
      dispatch(setUserProfileImageData(""));
      dispatch(setUserProfileEdited(true));
    });
  };

  const dynamicStyle = {
    border: readOnly ? "3px solid #ddd" : "3px dashed #aaa",
  };

  return (
    <div className={"dropAreaContainer"}>
      <div
        className={"dropArea"}
        onDrop={(e) => handleOnDrop(e)}
        onDragOver={(e) => handleOnDragOver(e)}
      >
        <img
          src={tempProfileImageData || Placeholder}
          style={dynamicStyle}
          alt="profile"
        />
        <div
          className={!readOnly ? "uplaodBtn" : ""}
          onClick={!readOnly ? () => inputFile.current.click() : undefined}
        ></div>
        {!readOnly && tempProfileImageData && (
          <CancelOutlinedIcon onClick={() => onRemove()} />
        )}
        <div className="dropAreaErrorContainer">
          {err && !readOnly && <p className="dropAreaError">{err}</p>}
        </div>
      </div>
    </div>
  );
};

export default DropArea;
