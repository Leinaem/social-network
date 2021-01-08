import React, { Fragment } from "react";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


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

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const dropAreaImageStyle = {
    // width: 250,
    // height: 250,
  };

  const dynamicStyle = {
    border: readOnly ? "5px solid #ddd" : "5px dashed #aaa",
  };

  return (
    <div className={"dropAreaContainer"} >
      {err && <p>{err}</p>}
      <div
        className={"dropArea"}
        style={dynamicStyle}
        onDrop={(e) => handleOnDrop(e)}
        onDragOver={(e) => handleOnDragOver(e)}
      >
        {data && (
          <Fragment>
            <img src={data}/>
            <CancelOutlinedIcon onClick={() => setData(false)}/>
          </Fragment>
        )}


      </div>
    </div>
  );
};
export default DropArea;
