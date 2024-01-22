import { createSlice } from "@reduxjs/toolkit";
import { libraryApi } from "../../api/libraryApi";

const bookSlice = createSlice({
    name:"book",
    initialState:[],
    extraReducers: (builder) => { 
         // apart of removing the dispatching and exporting actions
         // this is why we need " reducerPath: "libraryApi" inside of the reducer store.js 
         // libraryApi.endpoints.getPlayers.matchFulfilled
        builder.addMatcher(libraryApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
            return payload.books
        })
    }
})

export default bookSlice.reducer;