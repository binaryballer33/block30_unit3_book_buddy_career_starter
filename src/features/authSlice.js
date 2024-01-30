import { createSlice } from "@reduxjs/toolkit";
import { libraryApi } from "../api/libraryApi"

const initialState = { 
    message: "",
    token: "", 
    user: { id: "", firstname: "", lastname: "", email: "", books: [] },
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    extraReducers: (builder) => { 
        builder.addMatcher(libraryApi.endpoints.register.matchFulfilled, (state, { payload }) => {
            state.token = payload.token
            state.user = { ...payload.user, books: [] }
            state.message = payload.message 
        })
        builder.addMatcher(libraryApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.token = payload.token
            state.message = payload.message 
        })
        builder.addMatcher(libraryApi.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
            state.user = { ...payload }
        })
    }
});
export default authSlice.reducer;