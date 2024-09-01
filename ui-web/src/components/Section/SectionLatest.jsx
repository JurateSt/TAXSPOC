import React, { useState, useEffect, useRef } from 'react';
// MUI
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
// api
import api from '../../api/axios';
// components
import SectionCategory from './SectionCategory';
import MainArticle from '../MainArticle/MainArticle';
import ArticleCard from '../Article/ArticleCard';
import ArticleShortCard from '../Article/ArticleShortCard';

const Section = ({ section, onLoaded }) => {
	// const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
	const articlesPerPage = 8;

	const [articles, setArticles] = useState([]);
	const [mainArticle, setMainArticle] = useState({});

	const getArticles = async () => {
		const { data } = await api.get(`/articles-latest?limit=${articlesPerPage}`);

		setArticles(data);
		setMainArticle(data[0]);
		if (data && data.length > 0) {
			onLoaded();
		}
	};

	useEffect(() => {
		getArticles();
	}, []);
	return (
		articles.length > 0 && (
			<Grid
				container
				rowSpacing={1}
				sx={{
					borderBottom: '1px solid',
					borderColor: 'primary.divider',
					// border: '1px solid blue',
					// padding same as for category section title
					padding: '16px 0',
				}}
			>
				<SectionCategory section={section} />

				<Grid container item xs={12} columnSpacing={2} rowSpacing={2}>
					<Grid
						container
						item
						xs={12}
						sm={12}
						md={8}
						lg={8}
						xl={8}
						rowSpacing={2}
						// sx={{
						// 	border: '1px solid blue',
						// }}
					>
						<MainArticle article={mainArticle} />

						<Grid container item xs={12} columnSpacing={2} rowSpacing={2}>
							{articles.slice(1, 4).map((item, index) => (
								<Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4}>
									<ArticleCard key={index} article={item} />
								</Grid>
							))}
						</Grid>
					</Grid>
					{/* </Grid> */}
					<Grid
						container
						item
						rowSpacing={2}
						xs={12}
						sm={12}
						md={4}
						lg={4}
						xl={4}
						//start from flex start
						// sx={{
						// 	display: 'flex',
						// 	flexDirection: 'column',
						// 	justifyContent: 'flex-start',
						// 	// gap: '48px',
						// 	// border: '1px solid green',
						// }}
					>
						{articles.slice(4, 8).map((item, index) => (
							<Grid container item key={index} xs={12}>
								<ArticleShortCard key={index} article={item} index={index} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		)
	);
};

export default Section;
