import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useRegisterMutation } from "../api/libraryApi";
import { Loading, Error } from "../components";


const Profile = () => {
  // const user = { firstname: "Shaquille", lastname: "Mandy", email: "test333@gmail.com", password: "password333" }
  // const { data, error, isLoading } = useRegisterMutation(user)
  // if (isLoading) {
  // 	return <Loading isLoading={isLoading} />;
  // } else if (!data) {
  // 	return <Error error={error} />;
  // } else {
  // 	console.log(data);
  // }

    return ( 
        /* TODO:
        * change this to only work when the user is logged in and if not logged in 
        * display a message saying that they need to log in and have a link to redirect them to the login page
        */
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none", textAlign: "center" }}>Sign In / Up To See Your Profile</Typography>
        </Stack>
    );
};

export default Profile;