import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// api
import api from '../api/axios';
// components
import MainBar from '../components/MainBar.jsx';
import HotTopics from '../components/HotTopics/HotTopics.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';
import ReadArticlePhoto from '../components/Article/ReadArticlePhoto.jsx';
import ReadArticleSubHeader from '../components/Article/ReadArticleSubHeader.jsx';
import ReadArticleHeader from '../components/Article/ReadArticleHeader.jsx';
import ReadArticleSupportingText from '../components/Article/ReadArticleSupportingText.jsx';
import ReadArticleContent from '../components/Article/ReadArticleContent.jsx';
import ReadArticleCategories from '../components/Article/ReadArticleCategories.jsx';
import ReadArticleSuggested from '../components/Article/ReadArticleSuggested.jsx';
import ReadArticleSidePanel from '../components/Article/ReadArticleSidePanel.jsx';

const Article = () => {
	const { id } = useParams();

	const [article, setArticle] = useState({});
	const [articles, setArticles] = useState([]);

	const getArticle = async () => {
		const { data } = await api.get(`/articles/${id}`);
		// console.log('ARTICLE: ', data);

		setArticle(data);
	};

	// TODO: thing of more optimal way to get articles
	const getArticles = async () => {
		const { data } = await api.get('/articles');

		setArticles(data);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	useEffect(() => {
		getArticle();
		getArticles();
	}, [id]);

	return (
		<>
			<MainBar />
			<Container sx={{ marginTop: '16px' }}>
				<Grid container columnSpacing={2} rowSpacing={3}>
					{/* <Grid
					container
					// sx={{ border: '3px solid green' }}
					// make container vertical alignement to the top
					sx={{ marginBottom: '32px' }}
				>
					<Grid item xs={12}>
						<img
							src={article?.images?.[0]?.url}
							style={{ width: '100%', height: '210px', objectFit: 'cover' }}
							alt={article?.header}
						/>
					</Grid>
				</Grid> */}
					{/* <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}> */}
					<Grid
						container
						item
						rowSpacing={2}
						xs={12}
						sm={12}
						md={8}
						lg={8}
						xl={8}
						// sx={{
						// 	border: '1px solid red',
						// 	// flexDirection: 'column',
						// 	// justifyContent: 'center',
						// 	// alignItems: 'flex-start',
						// }}
					>
						<ReadArticleSubHeader article={article} />
						<ReadArticleHeader article={article} />
						<ReadArticleSupportingText article={article} />
						<ReadArticlePhoto article={article} />
						<ReadArticleContent article={article} />
						<ReadArticleCategories article={article} />
						{/* <ReadArticleSuggested currentArticle={article} articles={articles} /> */}
					</Grid>

					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
						<ReadArticleSidePanel article={article} />
					</Grid>
				</Grid>

				{/* <HotTopics /> */}
				{/* </Grid> */}
			</Container>
			<BottomContainer />
		</>
	);
};

export default Article;
