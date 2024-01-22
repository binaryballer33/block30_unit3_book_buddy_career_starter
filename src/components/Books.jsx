import React from "react";
import { Grid, Stack } from "@mui/material";
import { useGetBooksQuery } from "../api/libraryApi";
import Error from "./Error";
import Loading from "./Loading";
import SingleBook from "./SingleBook";

/* TODO - 
    add your code to create a functional React component that displays all of
    the available books in the library's catalog. Fetch the book data from the provided API.
    Users should be able to click on an individual book to navigate to the SingleBook component and view its details.
*/
const RenderBooks = ({ books }) => {
	return (
		<Stack sx={{ mt: 2, alignItems: "center" }}>
            <Grid container>
                {books.map((book) => (
                    <SingleBook book={book} key={book.id}/>
                ))}
            </Grid>
		</Stack>
	);
};

const Books = () => {
	const { data, error, isLoading } = useGetBooksQuery();
    console.log(data);

    if (isLoading) {
		return <Loading isLoading={isLoading} />;
	} else if (!data) {
		return <Error error={error} />;
	} else {
		return <RenderBooks books={data.books}/>;
	}
};

export default Books;
