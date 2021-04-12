const initialValues = {
  profileEdited: false,
  profilModalOpen: false,
  profileImageError: false,
  tempProfileImageData: null,
  profileModalReadOnly: true,
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
        tempProfileImageData: payload,
      };
    }
    case "SET_USER_PROFILE_IMAGE_ERROR": {
      return {
        ...state,
        profileImageError: payload,
      };
    }
    case "SET_USER_PROFILE_MODAL_READ_ONLY": {
      return {
        ...state,
        profileModalReadOnly: payload,
      };
    }
    case "SET_USER_PROFILE_EDITED": {
      return {
        ...state,
        profileEdited: payload,
      };
    }

    default:
      return state;
  }
};

export default UserProfileReducer;
