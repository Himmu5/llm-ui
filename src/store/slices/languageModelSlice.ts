import { createSlice } from "@reduxjs/toolkit";


const languageModelSlice = createSlice({
    name: "language_Model",
    initialState: {
        query: "",
        loading: false,
        totalSavedMessages:0,
        messages:{} as { [id:number]: string }
    },
    reducers: {
        setLanguageModel: (state, action) => {
            return action.payload;
        },
        setQuery:(state, action)=>{
             state.query = action.payload
        },
        startLLM:(state)=>{
            state.loading = true
            state.totalSavedMessages++;
        },
        streamUpdate:(state, action)=>{
            state.messages[state.totalSavedMessages] +=action.payload;
        }
    },
})

export const { setLanguageModel, setQuery, startLLM , streamUpdate} = languageModelSlice.actions;
export default languageModelSlice.reducer;