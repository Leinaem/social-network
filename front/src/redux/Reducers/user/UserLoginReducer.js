const initialState = {
  isLogged: false, // boolean
  userData: {}, // object
  openForm: "login", // string
  serverError: "", // string
  tmpMessage: null, // null || object
  isLoading: false, // boolean
};

const UserLoginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOGIN": {
      return {
        ...state,
        isLogged: payload,
      };
    }
    case "SET_OPEN_FORM_ACTION": {
      return {
        ...state,
        openForm: payload,
      };
    }
    case "ADD_TMP_MESSAGE": {
      return {
        ...state,
        tmpMessage: payload,
      };
    }
    case "SET_USER_DATA": {
      return {
        ...state,
        userData: payload,
      };
    }
    case "SET_LOGOUT": {
      return {
        ...state,
        isLogged: false,
        userName: "",
        userData: {},
        isLoading: false,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserLoginReducer;
