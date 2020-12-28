import {
  SET_SOCKET_CONNECTED,
  SET_SOCKET_ID,
} from "../Constants/SocketConstants";

export const setSocketConnectionAction = (connected) => {
  return {
    type: SET_SOCKET_CONNECTED,
    payload: connected,
  };
};

export const setSocketIdAction = (socketId) => {
  return {
    type: SET_SOCKET_ID,
    payload: socketId,
  };
};
