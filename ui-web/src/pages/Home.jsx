import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
// api
import api from '../api/axios';
// components
import MainBar from '../components/MainBar.jsx';
import MainArticle from '../components/MainArticle/MainArticle';
import ArticleCard from '../components/Article/ArticleCard.jsx';
import MainContainer from '../components/MainContainer.jsx';
import HotTopics from '../components/HotTopics/HotTopics.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';

const Spacer = styled('div')(({ theme }) => {
	console.log('theme.mixins.toolbar', theme.mixins.toolbar);
	return {
		...theme.mixins.toolbar,
		height: `calc(${theme.mixins.toolbar.minHeight * 3 + 26}px)`,
	};
});

const StyledContainer = styled(Container)(({ theme }) => ({
	border: '2px solid red',
	// height: '100vh',
}));

const Home = () => {
	const [articles, setArticles] = useState([]);

	const getArticles = async () => {
		const { data } = await api.get('/articles');
		console.log('getArticles', data);
		setArticles(data);
	};

	useEffect(() => {
		getArticles();
	}, []);

	return (
		<>
			<MainBar />
			<MainArticle articles={articles.filter((item) => item.featured === true)} />

			<Container>
				<Grid
					container
					// sx={{ border: '1px solid blue' }}
					columnSpacing={2}
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

export default Home;
