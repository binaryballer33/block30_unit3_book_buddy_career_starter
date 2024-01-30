import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Loading from "./Loading";
import { useGetBooksQuery } from "../api/libraryApi";
import BookCard from "./BookCard";

const RenderReservedBooks = ({ books }) => {
    const reservedBooks = books.filter(book => !book.available)
    return (
        <Stack sx={{ width: "100%", height: '100%', alignItems: "center", justifyContent: "center", overflow: "scroll" }}>
            <Typography variant="h4" color="primary" mt={3}>{reservedBooks.length} Reserved Books</Typography>
            <Grid container justifyContent="center">
                {reservedBooks.map((book, index) => (
                    <BookCard book={book} key={index}/>
                ))}
            </Grid>
        </Stack>
    );
};

const ReservedBooks = () => {
    const { data, error, isLoading } = useGetBooksQuery();

    if (isLoading) {
		return <Loading isLoading={isLoading} />;
	} else if (!data) {
		return <Error error={error} />;
	} else {
		return <RenderReservedBooks books={data.books}/>;
	}
};

export default ReservedBooks;
