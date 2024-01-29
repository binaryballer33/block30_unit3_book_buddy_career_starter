import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useGetProfileQuery } from "../api/libraryApi";
import { Loading, Error, SavedBooks } from "../components";

const RenderSignInPrompt = () => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/auth" sx={{ textDecoration: "none", textAlign: "center" }}>Sign In / Up To See Your Profile</Typography>
        </Stack>
    );
}

const RenderProfile = ({ profile }) => {
    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center", flexDirection: { xs: "column", md: "row" } }}>
            <Stack sx={{ flexGrow: 1, border: "1px solid black", height: "97vh", width: { xs: "100%", md: "30%" }, p: 2, marginLeft: { xs: 2, md: 0 } }}>
                <Typography variant="h6" color="primary" sx={{ textDecoration: "none", mb: 3, mt: 2 }}>Welcome {profile.firstname} {profile.lastname}</Typography>
                <Typography variant="h6" color="darkgoldenrod" sx={{ textDecoration: "none", mb: 3 }}>Email: {profile.email}</Typography>
                <Typography variant="h6" color="purple" sx={{ textDecoration: "none", mb: 3 }}>Account Id: {profile.id}</Typography>
            </Stack>
            <Stack sx={{ flexGrow: 1, border: "1px solid black", width: "100%", height: { xs: "75vh", md: "97vh" }, p: 2, alignItems: "center" }}>
                <Typography variant="h5" color="primary" sx={{ textDecoration: "none", mt: 2, mb: 2 }}>Your Saved Books</Typography>
                <SavedBooks />
            </Stack>
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