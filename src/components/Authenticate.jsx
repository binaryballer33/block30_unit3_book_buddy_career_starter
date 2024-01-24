import { Stack } from "@mui/material";
import React from "react";
import { SignIn, SignUp } from '../components'

const Authenticate = () => {
    return (
        <Stack sx={{ flexDirection: { xs: "column", md: "row"}, width: "80%", height: "90vh", ml: "auto", mr: "auto", columnGap: 2 }}>
            <SignIn width="85%" />
            <SignUp width="85%" />
        </Stack>
    )
};

export default Authenticate;
