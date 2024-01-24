import { Stack, Typography } from "@mui/material";

const Error = ({ error }) => (
    <Stack alignItems="center" justifyContent="center" height="80vh">
		<Typography variant="h3" color="red" mb={2}>
			{/* {console.log(error)} */}
			{/* Error Type: {error.data.error} */}
			Error Type: {error.name}
		</Typography>
		<Typography variant="h4" color="red">
			{/* Error Message: {error.data.message} */}
			Error Message: {error.message}
		</Typography>
	</Stack>
);

export default Error;