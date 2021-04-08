import {
  SET_USER_PROFILE_EDITED,
  SET_USER_PROFILE_MODAL_OPEN,
  SET_USER_PROFILE_IMAGE_DATA,
  SET_USER_PROFILE_IMAGE_ERROR,
  SET_USER_PROFILE_MODAL_READ_ONLY,
} from "@redux/Constants/UserProfileConstants";

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

/**
 * set load profile image error
 *
 * @param {string | false} image error on load
 * @return {object}
 */
export const setUserProfileImageError = (error) => {
  return {
    type: SET_USER_PROFILE_IMAGE_ERROR,
    payload: error,
  };
};

/**
 * set modal read only
 *
 * @param {boolean} readOnly read only or not
 * @return {object}
 */
export const setUserProfileModalReadOnly = (readOnly) => {
  return {
    type: SET_USER_PROFILE_MODAL_READ_ONLY,
    payload: readOnly,
  };
};

/**
 * set modal edited
 *
 * @param {boolean} edited form edited
 * @return {object}
 */
export const setUserProfileEdited = (edited) => {
  return {
    type: SET_USER_PROFILE_EDITED,
    payload: edited,
  };
};
