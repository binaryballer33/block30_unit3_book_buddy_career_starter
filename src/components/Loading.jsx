import { Stack, Typography, CircularProgress } from "@mui/material";

const Loading = () => (
	<Stack alignItems="center" justifyContent="center" sx={{ height: "80vh" }}>
		<Typography variant="h3" color="primary">
			Loading
		</Typography>
		<CircularProgress color="primary" />
	</Stack>
);

export default Loading;
