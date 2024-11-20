// MUI
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
const ReadArticleSidePanelSponsored = ({}) => {
	// return div with background grey200 height 200px

	return (
		<Grid item xs={12}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '200px',
					backgroundColor: 'primary.grey200',
					borderLeft: '4px solid',
					borderColor: 'primary.deepOrange400',
				}}
			>
				<Typography sx={{ fontSize: '20px', fontWeight: '700' }}>
					Reach your target audience
				</Typography>
				<Typography sx={{ fontSize: '16px' }}>
					Contact us at{' '}
					<a style={{ color: '#404040' }} href="mailto:hello@taxspoc.com">
						hello@taxspoc.com
					</a>
				</Typography>
			</Box>
		</Grid>
	);
};

export default ReadArticleSidePanelSponsored;
