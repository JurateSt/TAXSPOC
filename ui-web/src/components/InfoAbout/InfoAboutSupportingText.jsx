import React from 'react';
// MUI
import { Box, Typography, Grid } from '@mui/material';

const InfoAboutSupportingText = () => {
	return (
		<Grid item xs={12}>
			<Typography
				sx={{
					fontSize: ['20px', '20px', '24px'], // xs, sm, md
					lineHeight: ['24px', '24px', '28px'], // xs, sm, md
					fontStyle: 'normal',
					fontWeight: 400,
				}}
			>
				Your Single Single Point of Contact for Global and Local Tax News
			</Typography>
		</Grid>
	);
};

export default InfoAboutSupportingText;
