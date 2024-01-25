import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Paper,
    TextField,
    Button, 
    Typography,
    Stack,
    InputAdornment,
    Tooltip,
    IconButton
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useLoginMutation } from "../api/libraryApi";
import { Loading } from "../components";
import { transformTextField } from "../utils/helperFunctions";

// TODO: - maybe do a redirect once the user signs in, to the home page with the books
const SignIn = ({ width }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [focusedField, setFocusedField] = useState("");
    const textFields = ["Email", "Password"];
    const [login, { data, isLoading, isError }] = useLoginMutation();
    const token = localStorage.getItem("token")
    const message = useSelector((state) => state.auth.message);
    const signInMessage = message.toLowerCase().includes("login") && token ? message : "Sign In"

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data: { token } } = await login(formData)
        handleClearForm();
        if (token) localStorage.setItem("token", token);
    };

    const handleClearForm = () => {
        setFormData({ email: "", password: "" });
    }

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    } else if (token) {
        return (
            <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Typography textAlign="center" variant="h4" color="primary">You Are Already Logged In</Typography>
            </Stack>
        );
    } else {
        return (
            <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Paper 
                    component="form" 
                    elevation={3}
                    onSubmit={handleSubmit}
                    sx={{ p: 2, mt: 2, display: "flex", flexDirection: "column", gap: 2, width: width, minHeight: { md: 420}, justifyContent: "center" }}
                >
                    <Typography textAlign="center" variant="h4" color="primary">
                        { signInMessage }
                    </Typography>
                    
                    {/* Text Fields For The Sign In Form */}
                    {textFields.map((textfield) => (
                        <TextField 
                            key={textfield}
                            id={transformTextField(textfield)} 
                            label={textfield}
                            required 
                            value={formData[transformTextField(textfield)]} 
                            placeholder={`Type Your ${textfield} Here`}
                            // need a timeout to stop the onBlur from firing before the onClick event of the IconButton
                            onChange={(event) => setFormData({...formData, [transformTextField(textfield)]: event.target.value})} 
                            onFocus={() => setFocusedField(transformTextField(textfield))}
                            InputProps={{
                                endAdornment: (
                                    // only show the clear icon if the textfield is focused and the textfield is not empty
                                    focusedField === transformTextField(textfield) && formData[transformTextField(textfield)] !== "" && (
                                        <InputAdornment position="end">
                                            <Tooltip title="Clear Search Box">
                                                <IconButton onClick={() => setFormData({...formData, [transformTextField(textfield)]: "" })}>
                                                    <ClearIcon color="primary"/>
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )
                                )
                            }}
                            sx={{ width: "90%", ml: "auto", mr: "auto" }} 
                        />
                    ))}

                    {/* Submit and Clear Buttons */} 
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, placeItems: { xs: "center", md: "normal" }, justifyContent: { md: "center" } }} gap={1}>
                        <Button variant="contained" color="primary" sx={{ width: {  xs: "90%", md: "45%" } }} onClick={handleClearForm}>Clear Form</Button>
                        <Button variant="contained" color="primary" type="submit" sx={{ width: {  xs: "90%", md: "45%" } }}>Submit</Button>
                    </Box>

                    {/* Error Message */}
                    { isError && <Typography variant="h5" color="red" textAlign="center">Wrong Email / Password</Typography> }
                </Paper>
            </Stack>
        );
    }
};

export default SignIn;