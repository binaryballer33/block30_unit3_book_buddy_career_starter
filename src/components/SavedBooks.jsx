import React from "react";
import { Link } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { Loading, Error, BookCard } from "../components";
import { useGetProfileQuery } from "../api/libraryApi";

const RenderSignInPrompt = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/auth" sx={{ textDecoration: "none", textAlign: "center" }}>Sign In / Up To See Your Saved Books</Typography>
        </Stack>
    );
}

const RenderSavedBooks = ({ profile }) => {
    return (
        <Stack sx={{ width: "100%", height: { xs: 600, md: 800, lg: 875}, alignItems: "start", justifyContent: "center", overflow: "scroll", flexDirection: "row" }}>
            {profile.books.length 
                ? ( 
                    <Grid container sx={{ maxWidth: '100%', maxHeight: '90%', justifyContent: "center" }}>
                        {profile.books.map((book) => (
                            <Grid item key={book.id}>
                                <BookCard book={book} key={book.id}/>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h5" color="primary" sx={{ textDecoration: "none", textAlign: "center" }}>You Have No Saved Books</Typography>
                )
            }
        </Stack>
    )
};

const SavedBooks = () => {
    const token = localStorage.getItem("token");
    const { data: profile, error, isLoading } = useGetProfileQuery(token)

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (!token) {
        return <RenderSignInPrompt />
    } else if (error) {
        return <Error error={error} />;
    } else {
        return <RenderSavedBooks profile={profile} />
    }
}

export default SavedBooks;
