import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import MuiModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";

const Modal = (props) => {
  const { open, onClose, children, title, footer, noCloseCross } = props;
  const dynamicStyle = {};

  const header = () => {
    return (
      <div className="header">
        <h1>{title}</h1>
        {!noCloseCross && (
          <CloseIcon className="cross" onClick={() => onClose()} />
        )}
      </div>
    );
  };

  return (
    <div>
      <MuiModal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal" style={dynamicStyle ? dynamicStyle : ""}>
            {header()}
            {children}
            {footer && footer}
          </div>
        </Fade>
      </MuiModal>
    </div>
  );
};

export default React.memo(Modal);
