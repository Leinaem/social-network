import React from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Placeholder from "./../../../../assets/image/profile-placeholder.png";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfileImageData } from "./../../../../redux/Actions/user/ProfileActions";

const DropArea = (props) => {
  const { loadImage, err, readOnly, inputFile, FileListItems } = props;
  const { profileImageData: data } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  /**
   * On drop image on area
   *
   * @param {Event} e drop event
   * @return {false | void}
   */
  const handleOnDrop = (e) => {
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

    dispatch(setUserProfileImageData(null));
    loadImage(files[0]);
  };

  /**
   * Drag over event
   *
   * @param {Event} e drop event
   * @return {void}
   */
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const onRemove = () => {
    const profileInputFile = document.getElementById("fileUpload");
    profileInputFile.files = new FileListItems(null);
    dispatch(setUserProfileImageData(null));
  };

  const dynamicStyle = {
    border: readOnly ? "5px solid #eee" : "5px dashed #aaa",
  };

  return (
    <div className={"dropAreaContainer"}>
      {err && <p>{err}</p>}
      <div
        className={"dropArea"}
        style={dynamicStyle}
        onDrop={(e) => handleOnDrop(e)}
        onDragOver={(e) => handleOnDragOver(e)}
      >
        <img src={data ? data : Placeholder} alt="profile" />
        {!readOnly && data ? (
          <CancelOutlinedIcon onClick={() => onRemove()} />
        ) : (
          <div
            className="uplaodBtn"
            onClick={() => inputFile.current.click()}
          ></div>
        )}
      </div>
    </div>
  );
};

export default DropArea;
