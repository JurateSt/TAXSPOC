import React from 'react';
// MUI
import { Box, Typography, Grid } from '@mui/material';

const ReadArticleSupportingText = ({ article }) => {
	return (
		// <Box
		// 	sx={{
		// 		display: 'flex',
		// 		padding: '8px 32px',
		// 		flexDirection: 'column',
		// 		alignItems: 'flex-start',
		// 		gap: '8px',
		// 		alignSelf: 'stretch',
		// 	}}
		// >
		<Grid item xs={12} sx={{ marginTop: '32px' }}>
			<Typography
				sx={{
					fontSize: '24px',
					fontStyle: 'normal',
					fontWeight: 400,
					lineHeight: '28px',
				}}
			>
				{article?.supportingText}
			</Typography>
		</Grid>
		// </Box>
	);
};

export default ReadArticleSupportingText;
