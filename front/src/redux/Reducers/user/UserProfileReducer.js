const initialValues = {
  profilModalOpen: true,
  profileImageData: null,
};

const UserProfileReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USER_PROFILE_MODAL_OPEN": {
      return {
        ...state,
        profilModalOpen: payload,
      };
    }
    case "SET_USER_PROFILE_IMAGE_DATA": {
      return {
        ...state,
        profileImageData: payload,
      };
    }

    default:
      return state;
  }
};

export default UserProfileReducer;
