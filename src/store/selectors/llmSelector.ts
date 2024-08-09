import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"


const baseState = (state: RootState) => state.language_model

const getQuery = createSelector(baseState, (langState) => {
    return langState.query;
})

const getQuestions = createSelector(baseState, (langState) => langState.questions)
const getMessages = createSelector(baseState, (langState) => langState.messages)

export { getQuery, getQuestions, getMessages }