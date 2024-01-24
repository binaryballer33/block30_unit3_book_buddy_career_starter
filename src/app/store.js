// Import configureStore (function to create a Redux store with good default middleware settings) from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import the API service we defined (which includes the API endpoints and the reducer)
import { libraryApi } from "../api/libraryApi";
import authSlice from "../features/authSlice";
import booksSlice from "../features/booksSlice";

// Create a Redux store
export const store = configureStore({
	// Define the reducer for the store
	// We are adding the API service's reducer to our Redux store's reducer.
	// This means the API service's actions will be dispatched to the API service's reducer.
	reducer: {
		// The key is the reducerPath we defined in our API service, and the value is the reducer
		libraryApi: libraryApi.reducer,
		auth: authSlice,
		books: booksSlice,
	},
	// Add any additional middleware
	// getDefaultMiddleware is a function that returns the default middleware used by Redux Toolkit
	// We're concatenating our API service's middleware to the array of default middleware
	// This means that when we dispatch an action, the API service's middleware will have a chance to handle it
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(libraryApi.middleware),
});
