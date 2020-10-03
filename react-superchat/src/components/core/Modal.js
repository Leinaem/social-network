import React, { useState } from 'react';
import MuiModal from '@material-ui/core/Modal';

const Modal = (props) => {
    const { children } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <MuiModal
                open={open}
                onClose={handleClose}
            >
                {children}
            </MuiModal>
        </div>
    )
    
}

export default Modal;
