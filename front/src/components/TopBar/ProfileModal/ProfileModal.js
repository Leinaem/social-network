import React, { useRef } from "react";
import Modal from "./../../core/Modal";
import Button from "./../../core/Button";
import ProfileImage from "./ProfileImage";
import { useForm } from "react-hook-form";

const ProfileModal = (props) => {
  const { open, onClose, readOnly, setReadOnly, userProfileUpdate } = props;
  const { register, handleSubmit } = useForm();
  const submitBtn = useRef(null);

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
          type="submit"
          onClick={() => submitBtn.current.click()}
        >
          Enregistrer
        </Button>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} header={header()} footer={footer()}>
      <div className="content">
        <form id="profileForm" onSubmit={handleSubmit(userProfileUpdate)}>
          <ProfileImage readOnly={readOnly} register={register} />
          <input type="hidden" value="enter-user-id-here" name="userId" />
          <button hidden ref={submitBtn}></button>
        </form>
      </div>
    </Modal>
  );
};

export default React.memo(ProfileModal);