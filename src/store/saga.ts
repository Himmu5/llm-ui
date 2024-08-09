import createSagaMiddleware from "redux-saga"
import { takeLatest } from "redux-saga/effects"
import { startLLM } from "./slices/languageModelSlice"
import { getChatStream } from "./saga/chat-stream"

const rootSaga = function* () {
    yield takeLatest(startLLM, getChatStream)
}
const sagaMiddleware = createSagaMiddleware()
export { rootSaga, sagaMiddleware }