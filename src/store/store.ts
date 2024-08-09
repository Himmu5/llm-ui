import { configureStore } from "@reduxjs/toolkit";
import languageModelSlice from "./slices/languageModelSlice";
import { rootSaga, sagaMiddleware } from "./saga";

const store = configureStore({
    reducer:{
        language_model:languageModelSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>

export default store