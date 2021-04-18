import {
  addTmpMessageAction,
  setLoginAction,
  setUserData,
  isLoading,
} from "./loginSlice";

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
