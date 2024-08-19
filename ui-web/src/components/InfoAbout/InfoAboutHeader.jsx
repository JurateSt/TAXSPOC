import moment from 'moment';
// MUI
import { Typography, Grid } from '@mui/material';

const InfoAboutHeader = () => {
	return (
		<Grid item xs={12}>
			<Typography
				sx={{
					fontSize: ['24px', '24px', '40px'], // xs, sm, md
					lineHeight: ['32px', '32px', '48px'], // xs, sm, md
					fontStyle: 'normal',
					fontWeight: 600,
				}}
			>
				About Us | Our Values | Our Mission Statement
			</Typography>
		</Grid>
	);
};

export default InfoAboutHeader;
