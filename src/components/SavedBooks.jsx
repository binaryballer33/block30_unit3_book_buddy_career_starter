import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Loading, Error } from "../components";
import { useGetProfileQuery } from "../api/libraryApi";

const RenderSignInPrompt = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none", textAlign: "center" }}>Sign In / Up To See Your Saved Books</Typography>
        </Stack>
    );
}

// TODO: implement this page
const RenderSavedBooks = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none", textAlign: "center" }}>Implement This Page</Typography>
        </Stack>
    )
};

const SavedBooks = () => {
    const token = localStorage.getItem("token");
    const { data, error, isLoading } = useGetProfileQuery(token)

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (!token) {
        return <RenderSignInPrompt />
    } else if (error) {
        return <Error error={error} />;
    } else {
        return <RenderSavedBooks profile={data} />
    }
}

export default SavedBooks;
