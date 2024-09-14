import { configureStore } from "@reduxjs/toolkit";
import languageModelSlice from "./slices/languageModelSlice";
import { rootSaga, sagaMiddleware } from "./saga";
import fileSlice from "./slices/fileSlice";

const store = configureStore({
    reducer:{
        language_model:languageModelSlice,
        file:fileSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>

export default store