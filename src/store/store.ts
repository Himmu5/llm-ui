import { configureStore } from "@reduxjs/toolkit";
import languageModelSlice from "./slices/languageModelSlice";

const store = configureStore({
    reducer:{
        language_model:languageModelSlice
    }
})


export default store