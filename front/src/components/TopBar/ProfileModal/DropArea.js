import React, { Fragment } from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

const DropArea = (props) => {
  const { data, setData, loadImage, err, readOnly } = props;

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
    border: readOnly ? "5px solid #ddd" : "5px dashed #aaa",
  };

  /**
   *
   */
  const displayImage = () => {
    if (!data) {
      return <p>placeholder ??</p>;
    }
    return (
      data && (
        <Fragment>
          <img src={data} alt="profile" />
          {!readOnly && <CancelOutlinedIcon onClick={() => setData(false)} />}
        </Fragment>
      )
    );
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
        {displayImage()}
      </div>
    </div>
  );
};

export default DropArea;
