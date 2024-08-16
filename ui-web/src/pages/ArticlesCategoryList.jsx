import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const ArticlesCategoryList = ({}) => {
	const [searchParams] = useSearchParams();
	const categoryType = searchParams.get('type');
	const categoryName = searchParams.get('category');

	const [articles, setArticles] = useState([]);
	const [mainArticle, setMainArticle] = useState({});

	const getArticles = async () => {
		const params = new URLSearchParams({
			type: categoryType,
			category: categoryName,
		});
		const { data } = await api.get(`/articles/category?${params}`);
		setArticles(data);
		setMainArticle(data[0]);
	};

	useEffect(() => {
		getArticles();
	}, [searchParams]);
	console.log('ArticlesCategoryList articles', articles);
	return (
		<>
			<MainBar />
			<Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
				<Typography variant="h4">{categoryName}</Typography>
			</Box>

			<Container>
				<MainArticle article={mainArticle} />
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
								.slice(1)
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

export default ArticlesCategoryList;
