import { Stack, Typography } from "@mui/material";

const Error = ({ error }) => (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "80vh" }}>
		<Typography variant="h3" color="red" textAlign="center" mb={2}>
			Error Type: {error.data.error}
		</Typography>
		<Typography variant="h4" color="red" textAlign="center">
			Error Message: {error.data.message}
		</Typography>
	</Stack>
);

export default Error;