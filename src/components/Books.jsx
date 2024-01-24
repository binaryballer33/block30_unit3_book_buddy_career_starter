import React, { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { useGetBooksQuery } from "../api/libraryApi";
import { Error, Loading, BookCard, SearchBar } from '../components'
import { useSelector } from "react-redux";

/* TODO - 
    add your code to create a functional React component that displays all of
    the available books in the library's catalog. Fetch the book data from the provided API.
    Users should be able to click on an individual book to navigate to the SingleBook component and view its details.
*/
const RenderBooks = ({ books }) => {
	const [searchString, setSearchString] = useState("");
	const [filteredBooks, setFilteredBooks] = useState(books)
	const booksArray = useSelector((state) => state.books);

	useEffect(() => {
		const latestFilter = books.filter(book => book.title.toLowerCase().includes(searchString.toLowerCase()))
		setFilteredBooks(latestFilter)
	}, [searchString, books])

	console.log(booksArray);

	return (
		<Stack sx={{ mt: 2, alignItems: "center" }}>
			<SearchBar searchString={searchString} setSearchString={setSearchString} />
			<Grid container sx={{ maxWidth: '90%', justifyContent: "center" }}>
                {filteredBooks.map((book) => (
                    <BookCard book={book} key={book.id}/>
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
