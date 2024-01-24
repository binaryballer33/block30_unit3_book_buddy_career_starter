import React, { useState } from "react";
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
import { Loading, Error } from "../components";
import { transformTextField } from "../utils/helperFunctions";

const RenderSignIn = ({ width }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [focusedField, setFocusedField] = useState("");
    const textFields = ["Email", "Password"];
    
    const handleSubmit = async (event) => {
        // TODO: make this work later once Full Stack Academy API is working
        event.preventDefault();
    };

    const handleClearForm = () => {
        setFormData({ email: "", password: "" });
    }

    return (
        <Stack sx={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Paper 
                component="form" 
                elevation={3}
                onSubmit={handleSubmit}
                sx={{ p: 2, mt: 2, display: "flex", flexDirection: "column", gap: 2, width: width, minHeight: { md: 420}, justifyContent: "center" }}
            >
                <Typography textAlign="center" variant="h4" color="primary">Sign In</Typography>
                
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

                
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, placeItems: { xs: "center", md: "normal" }, justifyContent: { md: "center" } }} gap={1}>
                    <Button variant="contained" color="primary" sx={{ width: {  xs: "90%", md: "45%" } }} onClick={handleClearForm}>Clear Form</Button>
                    <Button variant="contained" color="primary" type="submit" sx={{ width: {  xs: "90%", md: "45%" } }}>Submit</Button>
                </Box>
            </Paper>
        </Stack>
    );
}

const SignIn = ({ width }) => {
    // TODO: get this working once Full Stack Academy API is working
    // const user = { email: "test333@gmail.com", password: "password333" }
    // const { data, error, isLoading } = useLoginMutation(user)
    // if (isLoading) {
    // 	return <Loading isLoading={isLoading} />;
    // } else if (!data) {
    // 	return <Error error={error} />;
    // } else {
    //  <RenderSignIn />
    // }
    return <RenderSignIn width={width} />
};

export default SignIn;
