import React from "react";
import { Link } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { Loading, Error, BookCard } from "../components";
import { useGetReservationsQuery } from "../api/libraryApi";

const RenderSignInPrompt = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/auth" sx={{ textDecoration: "none", textAlign: "center" }}>Sign In / Up To See Your Saved Books</Typography>
        </Stack>
    );
}

const RenderSavedBooks = ({ reservations }) => {    
    return (
        <Stack sx={{ width: "100%", height: { xs: 600, md: 800, lg: 875}, alignItems: "center", justifyContent: "center", overflow: "scroll" }}>
            <Typography variant="h5" color="primary" sx={{ textDecoration: "none", mt: 2, mb: 2 }}>Your {reservations.reservation.length} Saved Books</Typography>
            {reservations.reservation.length 
                ? ( 
                    <Grid container sx={{ maxWidth: '100%', maxHeight: '90%', justifyContent: "center" }}>
                        {reservations.reservation.map((book) => (
                            <BookCard book={book} key={book.id} checkoutIcon={true} removeIcon={true}/>
                        ))}
                    </Grid>
                ) 
                : (
                    <Typography variant="h5" color="primary" sx={{ textDecoration: "none", textAlign: "center" }}>You Have No Saved Books</Typography>
                )
            }
        </Stack>
    )
};

const SavedBooks = () => {
    const token = localStorage.getItem("token");
    const { data: reservations, error, isLoading } = useGetReservationsQuery(token)

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (!token) {
        return <RenderSignInPrompt />
    } else if (error) {
        return <Error error={error} />;
    } else {
        return <RenderSavedBooks reservations={reservations} />
    }
}

export default SavedBooks;
