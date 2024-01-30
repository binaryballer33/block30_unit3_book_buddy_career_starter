import React, { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { useGetBooksQuery } from "../api/libraryApi";
import { Error, Loading, BookCard, SearchBar } from '../components'
import { useSelector } from "react-redux";

// TODO: when you go back from Book after changing the availability, the book card doesn't update
const RenderBooks = ({ books }) => {
	const [searchString, setSearchString] = useState("");
	const [filteredBooks, setFilteredBooks] = useState(books)
	const token = useSelector(state => state.auth.token)
	
	useEffect(() => {
		const latestFilter = books.filter(book => book.title.toLowerCase().includes(searchString.toLowerCase()))
		setFilteredBooks(latestFilter)
	}, [searchString, books])

	return (
		<Stack sx={{ mt: 2, alignItems: "center" }}>
			<SearchBar searchString={searchString} setSearchString={setSearchString} />
			<Grid container sx={{ maxWidth: '90%', justifyContent: "center" }}>
                {filteredBooks.map((book) => (
                    <BookCard book={book} key={book.id} checkoutIcon={true}/>
                ))}
            </Grid>
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
