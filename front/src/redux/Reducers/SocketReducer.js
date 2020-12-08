const initialState = {
  socketConnected: false,
  socketId: "",
};

const SocketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_SOCKET_CONNECTED": {
      return {
        ...state,
        socketConnected: payload,
      };
    }
    case "SET_SOCKET_ID": {
      return {
        ...state,
        socketId: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default SocketReducer;
