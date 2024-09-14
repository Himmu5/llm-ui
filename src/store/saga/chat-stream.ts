import { streamCall } from "@/services/llm-service";
import { AnyAction } from "@reduxjs/toolkit";
import { call, put, take } from "redux-saga/effects";
import { streamUpdate } from "../slices/languageModelSlice";

const getChatStream = function* (action: AnyAction): Generator<any, any, any> {
    const {query, fileName} = action.payload
    const emitStream = streamCall(query, fileName)
    yield call(processStream, emitStream)
}

const processStream = function* (chan: any): Generator<any, any, any> {
    while (true) {
        const data = yield take(chan);
        yield put(streamUpdate(data));
    }
}

export { getChatStream }