import React, { useRef } from "react";
import Modal from "../../core/Modal";
import Button from "../../core/Button";
import ProfileForm from "./ProfilForm";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  setUserProfileEdited,
  setUserProfileImageError,
  setUserProfileModalReadOnly,
} from "./../../../redux/Actions/user/ProfileActions";

const ProfileModal = (props) => {
  const { open, onClose, userProfileUpdate } = props;
  const {
    profileImageError: err,
    profileModalReadOnly: readOnly,
  } = useSelector((state) => state.userProfile);

  const submitBtn = useRef(null);
  const dispatch = useDispatch();

  /**
   * Build profil modal footer
   *
   * @return {JSX} return footer div
   */
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
            onClick={() => dispatch(setUserProfileModalReadOnly(false))}
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
          onClick={() => {
            batch(() => {
              dispatch(setUserProfileModalReadOnly(true));
              dispatch(setUserProfileImageError(false));
              dispatch(setUserProfileEdited(false));
            });
          }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => submitBtn.current.click()}
          disabled={Boolean(err)}
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
          submitBtn={submitBtn}
        />
      </div>
    </Modal>
  );
};

export default React.memo(ProfileModal);
