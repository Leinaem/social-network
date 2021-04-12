import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ColorsState {
    current: string;
    saturation: number;
}

const initialState: ColorsState = {
    current: "Grey",
    saturation: 50
};

const colorsSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {
        selectColor(state, action: PayloadAction<string>) {
            state.current = action.payload
        }
    }
});



export const { selectColor } = colorsSlice.actions;
export const colorsSelector = (state: { colorsStore: ColorsState }) => 
state.colorsStore;
export default colorsSlice.reducer;
