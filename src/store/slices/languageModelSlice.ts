import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const languageModelSlice = createSlice({
    name: "language_Model",
    initialState: {
        query: "",
        loading: false,
        totalSavedMessages:0,
        messages:{} as { [id:string]: string },
        questions:{} as { [id:string]: string }
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
            state.query = ""
        },
        streamUpdate:(state, action)=>{
            const currentMessage = state.messages[state.totalSavedMessages]
            state.messages[state.totalSavedMessages] =currentMessage ? currentMessage + action.payload : ""+action.payload;
        }
    },
})

export const { setLanguageModel, setQuery, startLLM , streamUpdate} = languageModelSlice.actions;
export default languageModelSlice.reducer;