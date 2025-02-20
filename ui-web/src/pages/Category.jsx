import React, { useState, useEffect } from 'react';
//MUI
import { Container, Grid, Typography, Box, Tab } from '@mui/material';
import { useParams } from 'react-router-dom';
// api
import api from '../api/axios';
// Helmet
import { Helmet } from 'react-helmet-async';
//components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
import Section from '../components/Section/Section';

const Category = () => {
	const { category } = useParams();
	const [articles, setArticles] = useState([]);
	const [categoryData, setCategoryData] = useState({});

	const getArticles = async () => {
		const { data } = await api.get(`/category/${category}`);
		setArticles(data?.articles);
		setCategoryData(data?.category);
	};

	useEffect(() => {
		getArticles();
	}, [category]);

	const jsonLdData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		url: `https://www.taxspoc.com/category/${category}`,
		name: categoryData?.name || 'Category Articles',
		description:
			categoryData?.description ||
			`Explore the latest insights on ${categoryData?.name} at Taxspoc.`,
		publisher: {
			'@type': 'Organization',
			name: 'Taxspoc',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.taxspoc.com/logo-dark.png',
			},
		},
		image: categoryData?.image || 'https://www.taxspoc.com/logo-dark.png',
	};

	return (
		<>
			<Helmet>
				<title>{`categoryData?.name | Taxspoc`}</title>
				<meta
					name="description"
					content={
						categoryData?.description ||
						`Explore the latest articles and insights about ${categoryData?.name} on Taxspoc.`
					}
				/>
				<link rel="canonical" href={`https://taxspoc.com/category/${category}`} />
				<meta property="og:title" content={`${categoryData?.name} | Taxspoc`} />
				<meta
					property="og:description"
					content={
						categoryData?.description ||
						`Discover insights, updates, and news about ${categoryData?.name} at Taxspoc.`
					}
				/>
				<meta property="og:url" content={`https://taxspoc.com/category/${category}`} />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					property="og:image"
					content={categoryData?.image || 'https://www.taxspoc.com/logo-dark.png'}
				/>
				<meta
					name="twitter:image"
					content={categoryData?.image || 'https://www.taxspoc.com/logo-dark.png'}
				/>
				<meta name="twitter:title" content={`${categoryData?.name} | Taxspoc`} />
				<meta
					name="twitter:description"
					content={
						categoryData?.description ||
						`Stay informed on ${categoryData?.name} with expert analysis and news on Taxspoc.`
					}
				/>
				<script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
			</Helmet>
			<MainBar />
			<Container>
				<Section category={categoryData} articles={articles} />
				{/* <Grid
					container
					item
					xs={12}
					justifyContent="center"
					sx={{ padding: '16px 0', borderBottom: '1px solid', borderColor: 'primary.divider' }}
				>
					<LoadMore handleClick={handleLoadMore} />
				</Grid> */}
				<Grid item xs={12} sx={{ padding: '16px 0' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							height: '200px',
							backgroundColor: 'primary.grey200',
							borderLeft: '4px solid',
							borderColor: 'primary.deepOrange400',
						}}
					>
						<Typography sx={{ fontSize: '20px', fontWeight: '700' }}>
							Reach your target audience
						</Typography>
						<Typography sx={{ fontSize: '16px' }}>
							Contact us at{' '}
							<a style={{ color: '#404040' }} href="mailto:hello@taxspoc.com">
								hello@taxspoc.com
							</a>
						</Typography>
					</Box>
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default Category;
