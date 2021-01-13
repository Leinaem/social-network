import {
  SET_USER_PROFILE_MODAL_OPEN,
  SET_USER_PROFILE_IMAGE_DATA,
} from "../../Constants/UserProfileConstants";

/**
 * Manage user profile modal open/close
 *
 * @param {Boolean} open modale open or not
 * @return {object}
 */
export const setProfilModalOpen = (open) => {
  return {
    type: SET_USER_PROFILE_MODAL_OPEN,
    payload: open,
  };
};

/**
 * set temp profile image
 *
 * @param {string} data base64 image
 * @return {object}
 */
export const setUserProfileImageData = (data) => {
  return {
    type: SET_USER_PROFILE_IMAGE_DATA,
    payload: data,
  };
};
