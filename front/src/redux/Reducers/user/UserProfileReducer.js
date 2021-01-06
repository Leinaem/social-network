const initialValues = {
  profilModalOpen: false,
};

const UserProfileReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PROFILE_MODAL_OPEN": {
      return {
        ...state,
        profilModalOpen: payload,
      };
    }

    default:
      return state;
  }
};

export default UserProfileReducer;
