import React from 'react';
// MUI
import { Box, Typography, Grid } from '@mui/material';

const ReadArticleContent = ({ article }) => {
	return (
		// <Box
		// 	sx={{
		// 		display: 'flex',
		// 		padding: '8px 48px',
		// 		flexDirection: 'column',
		// 		alignItems: 'flex-start',
		// 		gap: '8px',
		// 		alignSelf: 'stretch',
		// 	}}
		// >
		<Grid item xs={12} sx={{ marginTop: '16px' }}>
			<Typography
				sx={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px' }}
			>
				<div dangerouslySetInnerHTML={{ __html: article.content }} />
			</Typography>
		</Grid>
		// </Box>
	);
};

export default ReadArticleContent;
