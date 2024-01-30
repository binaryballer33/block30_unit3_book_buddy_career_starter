import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Tooltip, CardActions, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import { capitalize } from "../utils/helperFunctions";
import { useDeleteReservationMutation } from "../api/libraryApi";

const BookCard = ({ book, checkoutIcon, removeIcon }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const availabilityColor = book?.available ? "green" : "red";
    let bookDescription = book.description.length > 100 ? book.description.slice(0, 100) + "..." : book.description;

    let bookTitle = capitalize(book.title);
    bookDescription = capitalize(bookDescription);

    
    const [deleteReservation, { data, isLoading, isError }] = useDeleteReservationMutation();

    const handleClick = (id) => {
        navigate(`/${id}`);
    }

    const handleDelete = async (id) => {
        await deleteReservation({id, token});
    }

    const handleReserve = () => {
        console.log("Reserve button clicked");
    };

    if (isLoading) {
        return null;
    } else if (isError) {
        return <Error error={isError} />;
    } else {
        return (
            <Grid item>
                <Tooltip title={bookTitle} placement="top" componentsProps={{}}>
                    <Card elevation={3} sx={{ width: 320, height: 550, m:1, border: `2px solid ${availabilityColor}` }}>
                        <CardMedia image={book.coverimage} alt={book.title} component="img" sx={{  width: { xs: "100%", sm: 320 }, height: 300, objectFit: "fill" }} />
                        <CardContent>
                            <Typography variant="h5" sx={{ overflowX: "scroll", whiteSpace: "nowrap", '&::-webkit-scrollbar': { display: "none" }, textAlign: "center"}}>{bookTitle}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "bold", textAlign: "center" }}>Author: {book.author}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: .5, textAlign: "center" }}>Available: <span style={{ color: availabilityColor, fontWeight: "bolder" }}>{book?.available?.toString()}</span></Typography>
                            <Typography variant="body2" sx={{ textAlign: "center" }}>{bookDescription}</Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: "center"}}>
                            {/* Only render the remove icon if you pass the component removeIcon={true} */}
                            { (removeIcon && token) &&
                                <IconButton onClick={() => handleDelete(book.id)}>
                                    <Tooltip title="Delete Reservation" placement="bottom">
                                        <RemoveIcon sx={{ color: "darkred" }}/>
                                    </Tooltip>
                                </IconButton>
                            }
                            <Button variant="contained" color="primary" sx={{ width: "70%" }} onClick={() => handleClick(book.id)}>See More</Button>
                            {/* Only let checkout button clickable if the book is available */}
                            {/* Only render the checkout icon if you pass the component removeIcon={true} */}
                            { (checkoutIcon && token) && 
                                <IconButton disabled={!book.available}>
                                    <Tooltip title="Checkout" placement="bottom">
                                        <AddShoppingCartIcon sx={{ color: availabilityColor }}/>
                                    </Tooltip>
                                </IconButton>
                            }
                        </CardActions>
                    </Card>
                </Tooltip>
            </Grid>
        )
    }
}

export default BookCard;
