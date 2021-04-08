import {
  SET_LOGIN,
  SET_LOGOUT,
  SET_USER_DATA,
  SET_IS_LOADING,
  ADD_TMP_MESSAGE,
  SET_OPEN_FORM_ACTION,
} from "@redux/Constants/LoginConstants";

export const setLoginAction = (login) => {
  return {
    type: SET_LOGIN,
    payload: login,
  };
};

export const setOpenFormAction = (openForm) => {
  return {
    type: SET_OPEN_FORM_ACTION,
    payload: openForm,
  };
};

export const addTmpMessageAction = (message) => {
  return {
    type: ADD_TMP_MESSAGE,
    payload: message,
  };
};

export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
};

/**
 * Fetch current user datas
 * @param {String} id
 * @return {Function} Action dispatch
 */
export const fetchCurrentUser = (id) => {
  return (dispatch) => {
    dispatch(
      async () =>
        await fetch(`/getuser/${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              dispatch(
                addTmpMessageAction({
                  type: "error",
                  message: data.error,
                })
              );
            } else {
              localStorage.setItem("userId", data.user.id);
              dispatch(setUserData(data.user));
              dispatch(setLoginAction(true));
            }
            dispatch(isLoading(false));
          })
    );
  };
};

/**
 * Log out
 *
 * @return {Object} Action dispatch
 */
export const setLogOut = () => {
  localStorage.removeItem("userId");
  // localStorage.clear(); ???
  return {
    type: SET_LOGOUT,
  };
};

export const isLoading = (loading) => {
  return {
    type: SET_IS_LOADING,
    payload: loading,
  };
};
