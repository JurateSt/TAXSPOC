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
		<Grid item xs={12}>
			{/* <Typography
				sx={{
					fontSize: ['20px', '20px', '24px'], // xs, sm, md
					lineHeight: ['24px', '24px', '28px'], // xs, sm, md
					fontStyle: 'normal',
					fontWeight: 400,
				}}
			>
				{article?.supportingText}
			</Typography> */}
			<h2 className="text-[20px] sm:text-[20px] md:text-[24px] leading-[24px] sm:leading-[24px] md:leading-[28px] font-normal m-0">
				{article?.supportingText}
			</h2>
		</Grid>
		// </Box>
	);
};

export default ReadArticleSupportingText;
