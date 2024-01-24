import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Tooltip, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils/helperFunctions";

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/${id}`);
    }

    const availabilityColor = book?.available ? "green" : "red";
    let bookDescription = book.description.length > 100 ? book.description.slice(0, 100) + "..." : book.description;

    let bookTitle = capitalize(book.title);
    bookDescription = capitalize(bookDescription);

    return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title={bookTitle} placement="top" componentsProps={{}}>
            <Card elevation={3} sx={{ width: { xs: "100%", sm: 320 }, height: 550, m:1, border: `2px solid ${availabilityColor}` }}>
                <CardMedia image={book.coverimage} alt={book.title} component="img" sx={{  width: { xs: "100%", sm: 320 }, height: 300, objectFit: "fill" }} />
                <CardContent>
                    <Typography variant="h5" sx={{ overflowX: "scroll", whiteSpace: "nowrap", '&::-webkit-scrollbar': { display: "none" }, textAlign: "center"}}>{bookTitle}</Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "bold", textAlign: "center" }}>Author: {book.author}</Typography>
                    <Typography variant="body1" sx={{ marginBottom: .5, textAlign: "center" }}>Available: <span style={{ color: availabilityColor, fontWeight: "bolder" }}>{book?.available?.toString()}</span></Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>{bookDescription}</Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center"}}>
                    <Button variant="contained" color="primary" sx={{ width: "70%" }} onClick={() => handleClick(book.id)}>See More</Button>
                </CardActions>
            </Card>
        </Tooltip>
    </Grid>     
    );
}

export default BookCard;
