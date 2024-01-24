import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const SavedBooks = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none" }} >Sign In / Up To See Your Saved Books</Typography>
        </Stack>
    )
};

export default SavedBooks;
