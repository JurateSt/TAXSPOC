import React, { useState, useEffect, useRef } from 'react';
// MUI
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
// api
import api from '../../api/axios';
// components
import ArticleShortCard from '../Article/ArticleShortCard';
import ReadArticleSidePanelCategory from './ReadArticleSidePanelCategory';
import ReadArticleSidePanelSponsored from './ReadArticleSidePanelSponsored';

const ReadArticleSidePanel = ({ article }) => {
	const [articles, setArticles] = useState([]);
	const limit = 8;
	const getArticles = async () => {
		const { data } = await api.get(`/articles-latest?limit=${limit}`);

		setArticles(data);
	};

	useEffect(() => {
		getArticles();
	}, []);

	return (
		<Grid container item rowSpacing={2}>
			<ReadArticleSidePanelCategory section={{ type: 'latest', category: 'Latest News' }} />
			{articles?.map((item, index) => (
				<Grid container item key={index} xs={12}>
					<ArticleShortCard key={index} article={item} index={index} />
				</Grid>
			))}
			<ReadArticleSidePanelSponsored />
		</Grid>
	);
};

export default ReadArticleSidePanel;
