import React from 'react';
// MUI
import { Box, Typography } from '@mui/material';

const ReadArticleContent = ({ article }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				padding: '8px 48px',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: '8px',
				alignSelf: 'stretch',
			}}
		>
			<Typography>
				<div dangerouslySetInnerHTML={{ __html: article.content }} />
			</Typography>
		</Box>
	);
};

export default ReadArticleContent;
