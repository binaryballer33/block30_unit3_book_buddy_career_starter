import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Tooltip, CardActions, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils/helperFunctions";
import { useSelector } from "react-redux";

// TODO: when you go back from Book after changing the availability, the book card doesn't update
// TODO: fix state.user.books, for some reason the array is a huge list of books, not the checked out books
const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const handleClick = (id) => {
        navigate(`/${id}`);
    }

    const handleCheckout = () => {
        
    }

    const availabilityColor = book?.available ? "green" : "red";
    let bookDescription = book.description.length > 100 ? book.description.slice(0, 100) + "..." : book.description;

    let bookTitle = capitalize(book.title);
    bookDescription = capitalize(bookDescription);

    return (
    <Grid item>
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
                    {/* Only let checkout button clickable if the book is available */}
                    <IconButton disabled={!book.available} onClick={handleCheckout}>
                        <Tooltip title="Checkout" placement="bottom">
                            <AddShoppingCartIcon sx={{ color: availabilityColor }}/>
                        </Tooltip>
                    </IconButton>
                </CardActions>
            </Card>
        </Tooltip>
    </Grid>     
    );
}

export default BookCard;
