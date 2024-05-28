import React from 'react';
// MUI
import { Box, Typography } from '@mui/material';

const ReadArticleSupportingText = ({ article }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				padding: '8px 32px',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: '8px',
				alignSelf: 'stretch',
			}}
		>
			<Typography>{article?.supportingText}</Typography>
		</Box>
	);
};

export default ReadArticleSupportingText;
