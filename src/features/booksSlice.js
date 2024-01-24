import { createSlice } from "@reduxjs/toolkit";
import { libraryApi } from "../api/libraryApi";

const booksSlice = createSlice({
    name:"books",
    initialState: { books: [] },
    extraReducers: (builder) => { 
         // apart of removing the dispatching and exporting actions
         // this is why we need " reducerPath: "libraryApi" inside of the reducer store.js 
         // libraryApi.endpoints.getPlayers.matchFulfilled
        builder.addMatcher(libraryApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
            state.books = payload.books
        })
    }
})

export default booksSlice.reducer;