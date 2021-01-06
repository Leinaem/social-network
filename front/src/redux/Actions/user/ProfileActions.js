/**
 *
 * @param {Boolean} open modale open or not
 * @return {object}
 */
export const setProfilModalOpen = (open) => {
  return {
    type: "SET_PROFILE_MODAL_OPEN",
    payload: open,
  };
};
