import React, { useState, useEffect } from 'react';
// MUI
import { Typography, Box, Button, Chip } from '@mui/material';
// components
import ReadArticleHeader from './ReadArticleHeader';
import ReadArticleSupportingText from './ReadArticleSupportingText';
import ReadArticleContent from './ReadArticleContent';
import ReadArticleCategories from './ReadArticleCategories';
import ReadArticleSuggested from './ReadArticleSuggested';

const ReadArticle = ({ articles, article }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '16px',
				flex: '1 0 0',
				alignSelf: 'stretch',
			}}
		>
			<Box sx={{ backgroundColor: '#FFFFFF' }}>
				<ReadArticleHeader article={article} />
				<ReadArticleSupportingText article={article} />
				<ReadArticleContent article={article} />
				<ReadArticleCategories article={article} />
			</Box>
			<ReadArticleSuggested currentArticle={article} articles={articles} />
		</Box>
	);
};

export default ReadArticle;
