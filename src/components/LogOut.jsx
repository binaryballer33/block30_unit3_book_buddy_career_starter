import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Stack, Typography } from '@mui/material'

const LogOut = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [token])
    
    if (!token) {
        return (
            <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color="primary" component={Link} to="/auth" sx={{ textDecoration: "none", textAlign: "center" }}>You Are Not Logged In</Typography>
            </Stack>
        )
    } else {
        localStorage.removeItem("token");

        // TODO: this code never runs, fix it, it's not because of the setTimeout
        return (
            <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color="primary" component={Link} to="/auth" sx={{ textDecoration: "none", textAlign: "center" }}>You Have Been Loged Out Successfully</Typography>
            </Stack>
        )
    }
};

export default LogOut;
