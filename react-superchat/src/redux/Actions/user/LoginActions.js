import {
  SET_LOGIN,
  SET_USER_NAME,
  ADD_TMP_MESSAGE,
  SET_OPEN_FORM_ACTION,
} from "../../Constants/LoginConstants";

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

export const fetchCurrentUser = (userName) => {
  fetch("http://localhost:82/getuser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      userName,
    }),
  }).then((res) => console.log(res));
};

// export const fetchCurrentUser = () => {
//     return (dispatch, getState, { client }) => {
//         const fetchUser = async () => {
//             const { data } = await client.query({
//                 query: GQL_CURRENT_USER,
//                 fetchPolicy: 'no-cache'
//             });

//             return data;
//         };

//         const promise = fetchUser();

//         return promise.then((result) => {
//             dispatch(setUserLoading(false));
//             dispatch(setCurrentUser(result.CurrentUser));
//         });
//     };
// };
