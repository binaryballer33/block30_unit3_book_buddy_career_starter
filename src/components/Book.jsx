import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Button, Stack, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookQuery, useUpdateBookAvailabilityMutation } from "../api/libraryApi";
import { Loading, Error } from "../components";
import { capitalize } from "../utils/helperFunctions";

/* TODO: - 
    You may consider conditionally rendering a 'Checkout' button for logged in users.
    Get the book to update in real time using useState
*/
const RenderBook = ({ book }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const availabilityColor = book?.available ? "green" : "red";
    const [updateAvailability, { data, isLoading, isError }] = useUpdateBookAvailabilityMutation()
    const token = useSelector((state) => state.auth.token);
    // const [books, setBooks] = useState(useSelector((state) => state.books.books));
    // const [modifiableBook, setModifiableBook] = useState(book);
    // console.log("Books: ", books);


    // capitalize the first letter of each word in the book description
    const bookDescription = capitalize(book.description);
    
    // navigate back to the previous page
    const handleClick = () => {
        navigate(-1);
    }

    // TODO: it works, fix it more later, right now it only shows the updated availability after you refresh the page
    // TODO: - have it update the state so that the change is reflected immediately
    const handleUpdateBookAvailability = async () => {
        console.log(await updateAvailability({ id: id, availability: !book.available, token: token}))
        
        // update the state of the books array
        // const updatedBooks = books.map((book) => {
        //     if (book.id === id) {
        //         return { ...book, available: !book.available }
        //     } else {
        //         return book
        //     }
        // })
        // setBooks(updatedBooks)

        // update the state of the book
        // book.available = !book.available;  // book is ready only, can't reassign it
    }

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (isError) {
        return <Error error={isError} />;
    } else {
        return (
            <Stack alignItems="center" justifyContent="center" height="99vh">
                <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleUpdateBookAvailability}>Toggle Availability</Button>
                
                <Card elevation={3} sx={{ width: { xs: "90%", md: "40%" }, height: "85%", overflow: "scroll", m:1, textAlign: "center", border: `3px solid ${availabilityColor}`}}>
                    <CardMedia image={book.coverimage} alt={book.title} component="img" sx={{ width: "100%", height: 400, objectFit: "fill" }} />
                    <CardContent>
                        <Typography variant="h4" sx={{ marginBottom: 1 }}>{capitalize(book.title)}</Typography>
                        <Divider sx={{ marginBottom: 1, width: "50%", ml: "auto", mr: "auto", border: "1px solid" }}/>
                        <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: "bold" }}>Author: {book.author}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: .5 }}>Available: <span style={{ color: availabilityColor, fontWeight: "bolder" }}>{book?.available?.toString()}</span></Typography>
                        <Typography variant="body2" sx={{ marginBottom: 3, width: { xs: "100%", md: "450px" }, ml: "auto", mr: "auto" }}>{capitalize(bookDescription)}</Typography>
                        <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleClick}>Go Back To Library</Button>
                    </CardContent>
                </Card>
            </Stack>
        );
    }
}

const Book = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetBookQuery(id);
    
    if (isLoading) {
		return <Loading isLoading={isLoading} />;
	} else if (!data) {
		return <Error error={error} />;
	} else {
		return <RenderBook book={data.book}/>;
	}
};

export default Book;