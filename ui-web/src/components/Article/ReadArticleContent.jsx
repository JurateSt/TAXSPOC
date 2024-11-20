import React from 'react';
// MUI
import { Box, Typography, Grid } from '@mui/material';

const ReadArticleContent = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography
				sx={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px' }}
			>
				<div dangerouslySetInnerHTML={{ __html: article.content }} />
			</Typography>
		</Grid>
	);
};

export default ReadArticleContent;
