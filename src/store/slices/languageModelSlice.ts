import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const languageModelSlice = createSlice({
    name: "language_Model",
    initialState: {
        query: "",
        loading: false,
        totalSavedMessages:0,
        messages:{} as { [id:number]: string },
        questions:{} as { [id:number]: string }
    },
    reducers: {
        setLanguageModel: (state, action) => {
            return action.payload;
        },
        setQuery:(state, action)=>{
             state.query = action.payload
        },
        startLLM:(state, action:PayloadAction<string>)=>{
            state.loading = true
            const Next = state.totalSavedMessages + 1
            state.totalSavedMessages = Next;
            state.questions = { ...state.questions, [Next]: state.query }
        },
        streamUpdate:(state, action)=>{
            state.messages[state.totalSavedMessages] += action.payload;
        }
    },
})

export const { setLanguageModel, setQuery, startLLM , streamUpdate} = languageModelSlice.actions;
export default languageModelSlice.reducer;