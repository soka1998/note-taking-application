import {createSlice} from "@reduxjs/toolkit"
import { fetchNotes } from "./noteThunk"
import { addNotes } from "./noteThunk"
import { updateNote } from "./noteThunk"
import { deleteNote } from "./noteThunk"

type CustomInitialState ={
    loading: boolean;
    note: null  // Change 'null' to 'any' for flexibility in typing
    error: unknown ; // Change 'null' to 'string' to match the potential error value type
  }
  
const initialState : CustomInitialState = {
    loading : true,
    error: null , 
    note : null

}


const noteSlice = createSlice({
    name : 'note' ,
    initialState ,
    reducers :{},
   extraReducers : (builder) => {
    builder 
    .addCase(fetchNotes.pending , (state) => {
        state.error = null , 
        state.loading = true
    })
    .addCase(fetchNotes.fulfilled , (state , action) => {
        state.loading = false
        state.note = action.payload
    })
    .addCase(fetchNotes.rejected , (state , action) => {
        state.error = action.error ,
        state.loading = false
    })
    builder 
    .addCase(addNotes.pending , (state) => {
        state.error = null ,
        state.loading = true
    })
    .addCase(addNotes.fulfilled , (state , action) =>{
        state.loading = false ,
        state.note = action.payload
    })
    .addCase(addNotes.rejected , (state , action ) => {
        state.error = action. error,
        state.loading = false
    })
    builder 
    .addCase(updateNote.pending , (state) => {
        state.error = null ,
        state.loading = true
    })
    .addCase(updateNote.fulfilled , (state , action) =>{
        state.loading = false ,
        state.note = action.payload
    })
    .addCase(updateNote.rejected , (state , action ) => {
        state.error = action. error,
        state.loading = false
    })
    builder 
    .addCase(deleteNote.pending , (state) => {
        state.error = null ,
        state.loading = true
    })
    .addCase(deleteNote.fulfilled , (state , action) =>{
        state.loading = false 
    })
    .addCase(deleteNote.rejected , (state , action ) => {
        state.error = action. error,
        state.loading = false
    })

   }
})
export default noteSlice