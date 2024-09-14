import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name:"file",
    initialState:{
        fileName:"",
        isFileUpload: false,
        isUploaderOpen: false
    },
    reducers:{
        setFile:(state, action)=>{
            state.fileName = action.payload
            state.isFileUpload = true
            state.isUploaderOpen = false
        },
        openUploader:(state)=>{
            state.isUploaderOpen = true
        },
        closeUploader:(state)=>{    
            state.isUploaderOpen = false
        }
    }
})

export const { setFile, openUploader, closeUploader } = fileSlice.actions;
export default fileSlice.reducer;