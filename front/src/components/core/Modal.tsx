import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import MuiModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

interface modalProps {
  open: boolean;
  onClose: Function;
  title?: string;
  noCloseCross?: boolean;
  footer?: JSX.Element;
  children: JSX.Element;
}

const Modal: React.FC<modalProps> = (props): JSX.Element => {
  const { noCloseCross, children, onClose, footer, title, open } = props;
  const dynamicStyle = {};

  const header = (): JSX.Element => {
    return (
      <div className="header">
        <h1>{title}</h1>
      </div>
    );
  };

  return (
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
          {!noCloseCross && (
            <CloseIcon className="cross" onClick={() => onClose()} />
          )}
          {title && header()}
          {children}
          {footer && footer}
        </div>
      </Fade>
    </MuiModal>
  );
};

export default React.memo(Modal);
