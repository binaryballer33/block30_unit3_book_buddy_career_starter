import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useGetProfileQuery } from "../api/libraryApi";
import { Loading, Error } from "../components";

const RenderSignInPrompt = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none", textAlign: "center" }}>Sign In / Up To See Your Profile</Typography>
        </Stack>
    );
}

// TODO: build the private profile page, make it look cooler
const RenderProfile = ({ profile }) => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" sx={{ textDecoration: "none", textAlign: "center" }}>Welcome {profile.firstname}</Typography>
            <Typography variant="h5" color="primary" sx={{ textDecoration: "none", textAlign: "center" }}>Your Account Email: {profile.email}</Typography>
        </Stack>
    );
}

const Profile = () => {
    const token = localStorage.getItem("token");
    const { data, error, isLoading } = useGetProfileQuery(token)

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (!token) {
        return <RenderSignInPrompt />
    } else if (error) {
        return <Error error={error} />;
    } else {
        return <RenderProfile profile={data} />
    }
};

export default Profile;