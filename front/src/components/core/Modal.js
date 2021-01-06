import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import MuiModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const Modal = (props) => {
  const { open, onClose, children, header, footer } = props;
  const dynamicStyle = {};

  return (
    <div>
      <MuiModal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal" style={dynamicStyle ? dynamicStyle : ""}>
            {header && header}
            {children}
            {footer && footer}
          </div>
        </Fade>
      </MuiModal>
    </div>
  );
};

export default React.memo(Modal);
