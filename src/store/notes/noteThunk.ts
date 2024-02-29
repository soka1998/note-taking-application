import { createAsyncThunk } from "@reduxjs/toolkit";

 export const fetchNotes = createAsyncThunk(
    'notes/getAllnotes' , 
    async (  ) => {
        try {
           const response = await fetch('url');
            const data = await response.json() ;
            return data; 
        } catch (error) {
           return error
        }
    }
)

 export const addNotes = createAsyncThunk(
    'notes/addnotes' ,
    async(credentials : {title :string , description : string} , thunkApi) => {
        try {
            const res = await fetch("url" , {
                headers : {
                    "Content-Type" : "application/json"
                }, 
                method : "POST",
                body : JSON.stringify(credentials)
            }) 
            const data = await res.json()
            return data ;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const updateNote = createAsyncThunk(
    'notes/putnotes' , 
    async(credentials : { id : string , title : string , description : string} , thunkApi)=> {
     try {
        const res = await fetch("url" , {
            headers :{
                "Content-Type" : "application/json"
            },
            method : "PUT" ,
            body : JSON.stringify(credentials)
        })
        const data = await res.json();
        return data 
     } catch (error) {
        return thunkApi.rejectWithValue(error)
     }
    }
)

export const deleteNote = createAsyncThunk (
    'notes/deletenotes' , 
    async(credentials : {id : string} , thunkApi)=> {
        try {
            const res = await fetch("url" , {
                headers :{
                    "Content-Type" : "application/json"
                },
                method : "DELETE" ,
                
            })
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
        
)

