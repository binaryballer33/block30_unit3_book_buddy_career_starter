import React from "react";
import { IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ searchString, setSearchString}) => {    
    // TODO: fix width not being the same size as the grid for the books
    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="center" width="90%">
            <TextField 
                id="outlined-basic" 
                label="Search For A Book" 
                variant="outlined" 
                placeholder="What Book Are You Looking For?" 
                value={searchString}
                sx={{ width: "100%", mb: 2, mt: 2 }}
                onChange={(event) => setSearchString(event.target.value)}
                // adds a X button to the end of the search bar to clear the search bar
                InputProps={{
                    endAdornment: (
                        searchString !== "" && (
                            <InputAdornment position="end">
                                <Tooltip title="Clear Search Box">
                                    <IconButton onClick={() => setSearchString("")}>
                                        <ClearIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    ),
                }}     
            />
        </Stack>
    );
};

export default SearchBar;
