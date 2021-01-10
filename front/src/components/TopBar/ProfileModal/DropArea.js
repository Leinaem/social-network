import React from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Placeholder from "./../../../assets/image/profile-placeholder.png";

const DropArea = (props) => {
  const { data, setData, loadImage, err, readOnly, refClick } = props;

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

    setData(false);
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
          <CancelOutlinedIcon onClick={() => setData(false)} />
        ) : (
          <div className="uplaodBtn" onClick={() => refClick()}></div>
        )}
      </div>
    </div>
  );
};

export default DropArea;
