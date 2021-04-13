import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SocketState {
    socketConnected: Boolean;
    socketId: string;
}

const initialState: SocketState = {
    socketConnected: false,
    socketId: "",
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketConnectionAction(state, action: PayloadAction<Boolean>) {
            state.socketConnected = action.payload
        },
        setSocketIdAction(state, action: PayloadAction<string>) {
            state.socketId = action.payload
        },
    },
});


export const { setSocketConnectionAction, setSocketIdAction } = socketSlice.actions;
export const socketSelector = (state: { socketStore: SocketState }) => 
state.socketStore;
export default socketSlice.reducer;
