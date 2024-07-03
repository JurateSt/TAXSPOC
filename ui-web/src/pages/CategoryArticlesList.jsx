import React, { useState, useEffect, useRef } from 'react';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// api
import api from '../api/axios';
// components
import MainBar from '../components/MainBar.jsx';
import MainArticle from '../components/MainArticle/MainArticle';
import HotTopics from '../components/HotTopics/HotTopics.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';
import ArticleCard from '../components/Article/ArticleCard.jsx';

const CategoryArticlesList = ({ category }) => {
	const [articles, setArticles] = useState([]);

	const getArticles = async () => {
		const { data } = await api.get('/articles');
		setArticles(data.filter((item) => item?.categories.some((cat) => cat.name === category)));
	};

	useEffect(() => {
		getArticles();
	}, [category]);
	return (
		<>
			<MainBar />
			<Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
				<Typography variant="h4">{category}</Typography>
			</Box>
			<MainArticle articles={articles.slice(0, 1)} />
			<Container>
				<Grid
					container
					// sx={{ border: '1px solid blue' }}
					columnSpacing={2}
					minHeight="100vh"
				>
					<Grid
						container
						item
						xs={12}
						sm={12}
						md={8}
						lg={8}
						xl={8}
						// sx={{
						// 	border: '1px solid purple',
						// }}
					>
						<Grid
							container
							item
							spacing={2}
							// sx={{ backgroundColor: 'lightgrey' }}
						>
							{articles
								.sort((a, b) => b.articleDate - a.articleDate)
								.map((item, index) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={6}
										lg={6}
										xl={6}
										// sx={{ border: '1px solid orange' }}
										key={index}
									>
										<ArticleCard key={item.id} article={item} />
									</Grid>
								))}
						</Grid>
					</Grid>

					<HotTopics />
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default CategoryArticlesList;
