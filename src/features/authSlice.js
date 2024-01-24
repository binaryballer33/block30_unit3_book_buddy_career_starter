import { createSlice } from "@reduxjs/toolkit";
import { libraryApi } from "../api/libraryApi"

const authSlice = createSlice({
    name:"auth",
    initialState: { token: "" },
    extraReducers: (builder) => { 
         // apart of removing the dispatching and exporting actions
         // this is why we need " reducerPath: "libraryApi" inside of the reducer store.js 
         // libraryApi.endpoints.getPlayers.matchFulfilled
        builder.addMatcher(libraryApi.endpoints.register.matchFulfilled, (state, { payload }) => {
            return payload.token
        })
        // I think I need one of these for login and getProfile
        // builder.addMatcher(libraryApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        //     return payload.token
        // })
        // builder.addMatcher(libraryApi.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
        //     return payload
        // })
    }
})

export default authSlice.reducer;