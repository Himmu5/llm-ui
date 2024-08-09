import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"


const baseState = (state:RootState)=> state.language_model

const getQuery = createSelector(baseState, (langState)=>{
    return langState.query;
})

export { getQuery }