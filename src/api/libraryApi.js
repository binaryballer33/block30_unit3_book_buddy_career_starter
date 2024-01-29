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
		// book endpoints
		getBooks: builder.query({
			query: () => "/api/books",
		}),
		getBook: builder.query({
			query: (id) => `/api/books/${id}`,
		}),
		getReservations: builder.query({
			query: (token) => ({
				url: '/api/reservations',
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
		}),  
		updateBookAvailability: builder.mutation({
			query: (book) => ({
				url: `/api/books/${book.id}`,
				method: 'PATCH',
				body: { available: book.availability }, 
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${book.token}`
				},
			}),
		}),
		deleteReservation: builder.mutation({
			query: (book) => ({
				url: `/api/reservations/${book.id}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${book.token}`
				},
			}),
		}),

		// auth endpoints
		getProfile: builder.query({
			query: (token) => ({
				url: '/api/users/me',
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
		}), 
		register: builder.mutation({
			query: (user) => ({
				url: '/api/users/register',
				method: "POST",
				body: user,
				headers: {
					'Content-Type': 'application/json',
				}
			})
		}), 
		login: builder.mutation({
			query: (user) => ({
				url: '/api/users/login',
				method: "POST",
				body: user,
				headers: {
					'Content-Type': 'application/json',
				}
			})
		}),
	}),
});

// Export hooks for each endpoint - in this case, a React hook that triggers the fetchPlayers query
export const {
	// book endpoints
    useGetBooksQuery,
    useGetBookQuery,
	useGetReservationsQuery,
	useUpdateBookAvailabilityMutation,
	useDeleteReservationMutation,
	
	// auth endpoints
	useGetProfileQuery,
	useRegisterMutation,
	useLoginMutation,
} = libraryApi;
