import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
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
import ReadArticleShare from '../components/Article/ReadArticleShare.jsx';
import ReadArticleAuthor from '../components/Article/ReadArticleAuthor.jsx';

const Article = () => {
	// const { id } = useParams();
	const { slug } = useParams();

	const [article, setArticle] = useState({});
	const [articles, setArticles] = useState([]);

	const getArticle = async () => {
		const { data } = await api.get(`/articles/${slug}`);
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
	}, [slug]);

	useEffect(() => {
		getArticle();
		// getArticles();
	}, [slug]);

	const jsonLdData = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		url: `https://www.taxspoc.com/articles/${article.slug}`,
		publisher: {
			'@type': 'Organization',
			name: 'Taxspoc',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.taxspoc.com/logo-dark.png',
			},
		},
		headline: article.header,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.taxspoc.com/articles/${article.slug}`,
		},
		image: article?.images?.[0]?.url,
		datePublished: article.dateTag || new Date().toISOString(),
		description: article.description,
		author: {
			'@type': 'Organization',
			name: 'Taxspoc Team',
		},
		isAccessibleForFree: true,
		keywords: article?.tags?.join(', '),
	};

	return (
		<>
			<Helmet>
				<title>{article.header}</title>
				<meta name="title" content={article.header} />
				<link rel="canonical" href={`https://www.taxspoc.com/articles/${article.slug}`} />
				<meta name="description" content={article.description} />
				{/* Open Graph / Social Meta Tags */}
				<meta property="og:title" content={article.header} />
				<meta property="og:description" content={article.description} />
				<meta property="og:type" content="article" />
				<meta property="og:image" content={article?.images?.[0]?.url} />
				<meta property="og:url" content={`https://www.taxspoc.com/articles/${article.slug}`} />
				{/* Twitter Meta Tags */}
				{/* <meta name="twitter:card" content="summary_large_image" /> */}
				<meta name="twitter:title" content={article.header} />
				<meta name="twitter:description" content={article.supportingText} />
				<meta name="twitter:image" content={article?.images?.[0]?.url} />
				{/* schema.org */}
				<script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
			</Helmet>

			<MainBar />
			<Container sx={{ marginTop: '16px' }}>
				<Grid container columnSpacing={2} rowSpacing={3}>
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
						<ReadArticleShare article={article} />
						<ReadArticlePhoto article={article} />
						<ReadArticleContent article={article} />
						<ReadArticleAuthor article={article} />
						<ReadArticleCategories article={article} />
						{/* <ReadArticleSuggested currentArticle={article} articles={articles} /> */}
					</Grid>

					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
						<ReadArticleSidePanel article={article} />
					</Grid>
				</Grid>
			</Container>
			<BottomContainer />
		</>
	);
};

export default Article;
