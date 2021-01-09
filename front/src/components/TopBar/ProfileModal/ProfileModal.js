import React from "react";
import Modal from "./../../core/Modal";
import Button from "./../../core/Button";
import ProfileImage from "./ProfileImage";

const ProfileModal = (props) => {
  const { open, onClose, readOnly, setReadOnly } = props;

  const header = () => {
    return (
      <div className="header">
        <h1>Profil</h1>
      </div>
    );
  };

  const footer = () => {
    if (readOnly) {
      return (
        <div className="footer">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onClose()}
          >
            Fermer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setReadOnly(false)}
          >
            Modifier
          </Button>
        </div>
      );
    }

    return (
      <div className="footer">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setReadOnly(true)}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setReadOnly(true);
            onClose();
          }}
        >
          Enregistrer
        </Button>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} header={header()} footer={footer()}>
      <p>
        readOnly : {readOnly && <span>1</span>}
        {!readOnly && <span>0</span>}
      </p>
      <div className="content">
        <ProfileImage readOnly={readOnly} />
      </div>
    </Modal>
  );
};

export default React.memo(ProfileModal);
