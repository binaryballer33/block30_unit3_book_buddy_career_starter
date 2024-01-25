import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Stack, Divider, Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBookQuery, useUpdateBookAvailabilityMutation } from "../api/libraryApi";
import { Loading, Error } from "../components";
import { capitalize } from "../utils/helperFunctions";

/* TODO: - 
    You may consider conditionally rendering a 'Checkout' button for logged in users.
*/
const RenderBook = ({ book }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateAvailability, { data, isLoading, isError }] = useUpdateBookAvailabilityMutation()
    const token = localStorage.getItem("token");
    const [modifiableBook, setModifiableBook] = useState(book);
    const availabilityColor = modifiableBook?.available ? "green" : "red";

    // capitalize the first letter of each word in the book description
    const bookDescription = capitalize(book.description);
    
    // navigate back to the previous page
    const handleClick = () => {
        navigate(-1);
    }

    const handleUpdateBookAvailability = async () => {
        const changedBook = await updateAvailability({ id: id, availability: !modifiableBook.available, token: token})
        setModifiableBook(changedBook.data.book)
    }

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (isError) {
        return <Error error={isError} />;
    } else {
        return (
            <Stack sx={{ alignItems: "center", justifyContent: "center", height: "99vh" }}>
                { token 
                    ? <Button variant="contained" color="primary" sx={{ marginBottom: 2, marginRight: 5 }} onClick={handleUpdateBookAvailability}>Toggle Availability</Button> 
                    : <Button variant="contained" color="primary" sx={{ marginBottom: 2, marginRight: 5 }} onClick={ () => navigate('/signin') }>Sign In To Toggle Availability</Button> 
                }

                <Card elevation={3} sx={{ width: { xs: "90%", md: "40%" }, height: "85%", overflow: "scroll", m:1, textAlign: "center", border: `3px solid ${availabilityColor}`}}>
                    <CardMedia image={modifiableBook.coverimage} alt={modifiableBook.title} component="img" sx={{ width: "100%", height: 400, objectFit: "fill" }} />
                    <CardContent>
                        <Typography variant="h4" sx={{ marginBottom: 1 }}>{capitalize(modifiableBook.title)}</Typography>
                        <Divider sx={{ marginBottom: 1, width: "50%", ml: "auto", mr: "auto", border: "1px solid" }}/>
                        <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: "bold" }}>Author: {modifiableBook.author}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: .5 }}>Available: <span style={{ color: availabilityColor, fontWeight: "bolder" }}>{modifiableBook?.available?.toString()}</span></Typography>
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