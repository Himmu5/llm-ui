import { configureStore } from "@reduxjs/toolkit";
import languageModelSlice from "./slices/languageModelSlice";

const store = configureStore({
    reducer:{
        language_model:languageModelSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store