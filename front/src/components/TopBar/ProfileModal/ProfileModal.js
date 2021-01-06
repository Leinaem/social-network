import React from "react";
import Modal from "./../../core/Modal";

const ProfileModal = (props) => {
  const { open, onClose } = props;

  const header = () => {
    return (
      <div className="header">
        <h1>Profil</h1>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="footer">
        <button onClick={() => onClose()}>Annulé</button>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} header={header()} footer={footer()}>
      <div className="content">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </Modal>
  );
};

export default React.memo(ProfileModal);
