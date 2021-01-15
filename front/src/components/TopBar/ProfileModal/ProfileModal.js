import React, { useRef } from "react";
import Modal from "../../core/Modal";
import Button from "../../core/Button";
import ProfileForm from "./ProfilForm";

const ProfileModal = (props) => {
  const { open, onClose, readOnly, setReadOnly, userProfileUpdate } = props;
  const submitBtn = useRef(null);

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
          type="submit"
          onClick={() => submitBtn.current.click()}
        >
          Enregistrer
        </Button>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} title={"Profil"} footer={footer()}>
      <div className="content">
        <ProfileForm
          userProfileUpdate={userProfileUpdate}
          readOnly={readOnly}
          submitBtn={submitBtn}
        />
      </div>
    </Modal>
  );
};

export default React.memo(ProfileModal);
