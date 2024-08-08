import { createSlice } from "@reduxjs/toolkit";

const languageModelSlice = createSlice({
    name: "language_Model",
    initialState: {
        query: ""
    },
    reducers: {
        setLanguageModel: (state, action) => {
            return action.payload;
        },
        setQuery:(state, action)=>{
             state.query = action.payload
        }
    },
})

export const { setLanguageModel, setQuery } = languageModelSlice.actions;
export default languageModelSlice.reducer;