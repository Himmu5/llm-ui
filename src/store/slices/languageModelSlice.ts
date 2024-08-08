import { createSlice } from "@reduxjs/toolkit";

const languageModelSlice = createSlice({
    name: "language_Model",
    initialState: {},
    reducers: {
        setLanguageModel: (state, action) => {
            return action.payload;
        },
    },
})

export const { setLanguageModel } = languageModelSlice.actions;
export default languageModelSlice.reducer;