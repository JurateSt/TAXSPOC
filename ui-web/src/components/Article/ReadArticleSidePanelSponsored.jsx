// MUI
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
const ReadArticleSidePanelSponsored = ({}) => {
	// return div with background grey200 height 200px

	return (
		<Grid item xs={12}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '200px',
					backgroundColor: 'primary.grey200',
				}}
			>
				<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Sponsored Content</Typography>
			</Box>
		</Grid>
	);
};

export default ReadArticleSidePanelSponsored;
