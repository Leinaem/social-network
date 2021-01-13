import React, { useEffect } from "react";
import { setUserProfileImageData } from "./../../../../redux/Actions/user/ProfileActions";
import Placeholder from "./../../../../assets/image/profile-placeholder.png";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useSelector, useDispatch } from "react-redux";

const DropArea = (props) => {
  const { loadImage, err, readOnly, inputFile, FileListItems } = props;
  const { tempProfileImageData } = useSelector((state) => state.userProfile);
  const { photo } = useSelector((state) => state.userLogin.userData);
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

  useEffect(() => {
    if (photo) {
      dispatch(
        setUserProfileImageData(
          `http://localhost:82/uploads/images/profile/${photo}`
        )
      );
    } else {
      dispatch(setUserProfileImageData(null));
    }
  }, [readOnly, photo, dispatch]);

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
        <img src={tempProfileImageData || Placeholder} alt="profile" />
        <div
          className={!readOnly ? "uplaodBtn" : ""}
          onClick={!readOnly ? () => inputFile.current.click() : undefined}
        ></div>
        {!readOnly && tempProfileImageData && (
          <CancelOutlinedIcon onClick={() => onRemove()} />
        )}
      </div>
    </div>
  );
};

export default DropArea;
