import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from '@mui/material'

const LogOut = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return (
            <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none", textAlign: "center" }}>You Are Not Logged In</Typography>
            </Stack>
        )
    } else {
        localStorage.removeItem("token");
        return (
            <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color="primary" component={Link} to="/authenticate" sx={{ textDecoration: "none", textAlign: "center" }}>You Have Been Loged Out Successfully</Typography>
            </Stack>
        )
    }
};

export default LogOut;
