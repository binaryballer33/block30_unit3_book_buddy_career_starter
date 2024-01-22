// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API using createApi
export const libraryApi = createApi({
	// Unique string used in constructing Redux action types, state selectors, and React hook names
	reducerPath: "libraryApi",
	// Define a base query function that all endpoints will use as the base of their request
	baseQuery: fetchBaseQuery({
		// The base URL for all requests
		baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com",
	}),
	// Define endpoints for our API service
	endpoints: (builder) => ({
		// Define an endpoint that fetches players
		// The part of the URL that comes after the baseUrl for this specific endpoint
		getBooks: builder.query({
			query: () => "/api/books",
		}),
		getBook: builder.query({
			query: (id) => `/api/books/${id}`,
		}),
	}),
});

// Export hooks for each endpoint - in this case, a React hook that triggers the fetchPlayers query
export const {
    useGetBooksQuery,
    useGetBookQuery
} = libraryApi;
