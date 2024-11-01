import React, { useState, useEffect, useRef } from 'react';
// MUI
import { AppBar, Container, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// api
import api from '../../api/axios';
// components
import SectionCategory from './SectionCategory';
import MainArticle from '../MainArticle/MainArticle';
import ArticleCard from '../Article/ArticleCard';
import ArticleShortCard from '../Article/ArticleShortCard';

const Section = ({ section, limit, customStyles }) => {
	// const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

	const [articles, setArticles] = useState([]);

	const getArticles = async () => {
		const params = new URLSearchParams({
			type: section.type,
			category: section.category,
		});

		if (section.type === 'latest') {
			const { data } = await api.get(`/articles-latest?limit=${limit}`);
			setArticles(data);
			return;
		}
		const { data } = await api.get(`/articles/category?${params}&limit=${limit}`);
		setArticles(data);
	};

	useEffect(() => {
		getArticles();
	}, [section]);

	return (
		// articles.length > 0 && (
		<Grid
			container
			rowSpacing={1}
			sx={{
				borderBottom: '1px solid',
				borderColor: 'primary.divider',
				// border: '1px solid green',
				padding: '16px 0',
				...customStyles,
			}}
		>
			<SectionCategory section={section} />

			<Grid
				container
				item
				xs={12}
				// sx={{ border: '1px solid blue' }}
				columnSpacing={2}
				rowSpacing={2}
			>
				{articles?.map((item, index) => (
					<Grid container item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
						<ArticleCard key={index} article={item} />
					</Grid>
				))}
			</Grid>
		</Grid>
		// )
	);
};

export default Section;
