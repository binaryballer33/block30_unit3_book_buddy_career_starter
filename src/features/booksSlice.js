import { createSlice } from "@reduxjs/toolkit";
import { libraryApi } from "../api/libraryApi";

const booksSlice = createSlice({
    name:"books",
    initialState: { books: [] },
    extraReducers: (builder) => { 
        builder.addMatcher(libraryApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
            state.books = payload.books
        })
    }
})

export default booksSlice.reducer;