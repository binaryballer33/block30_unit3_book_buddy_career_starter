import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useGetBooksQuery } from "../api/libraryApi";
import Error from "./Error";
import Loading from "./Loading";

/* TODO - 
    add your code to create a functional React component that displays all of
    the available books in the library's catalog. Fetch the book data from the provided API.
    Users should be able to click on an individual book to navigate to the SingleBook component and view its details.
*/
const RenderBooks = ({ books }) => {
	return (
		<Stack sx={{ mt: 2, alignItems: "center" }}>
			{books.map((book) => (
				<Typography variant="h4" color="primary">
					{book.title}
				</Typography>
			))}
		</Stack>
	);
};

const Books = () => {
	const { data, error, isLoading } = useGetBooksQuery();

    if (isLoading) {
		return <Loading isLoading={isLoading} />;
	} else if (!data) {
		return <Error error={error} />;
	} else {
		return <RenderBooks books={data.books}/>;
	}
};

export default Books;
