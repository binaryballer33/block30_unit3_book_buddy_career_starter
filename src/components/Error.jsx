import { Stack, Typography } from "@mui/material";

const Error = ({ error }) => (
    <Stack alignItems="center" justifyContent="center" height="80vh">
		<Typography variant="h3" color="red" mb={2}>
			Error Type: {error.data.error}
		</Typography>
		<Typography variant="h4" color="red">
			Error Message: {error.data.message}
		</Typography>
	</Stack>
);

export default Error;