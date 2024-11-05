import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
// api
import api from '../api/axios';
// components
import MainBar from '../components/MainBar.jsx';
import MainArticle from '../components/MainArticle/MainArticle';
import HotTopics from '../components/HotTopics/HotTopics.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';
import ArticleCard from '../components/Article/ArticleCard.jsx';
import Section from '../components/Section/Section.jsx';
import LoadMore from '../components/StylingComponents/LoadMore.jsx';

const ArticlesCategoryList = ({}) => {
	const [searchParams] = useSearchParams();
	console.log('searchParams', searchParams);
	const categoryType = searchParams.get('type');
	const categoryName = searchParams.get('category');

	const [page, setPage] = useState(1);
	const articlesPerPage = 256;

	const handleLoadMore = () => {
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		setPage(1);
	}, [categoryName]);

	return (
		<>
			<MainBar />

			<Container>
				{/* <MainArticle article={mainArticle} /> */}
				<Section
					section={{ category: categoryName, type: categoryType }}
					limit={articlesPerPage * page}
					customStyles={{ borderBottom: 'none' }}
				/>
				<Grid
					container
					item
					xs={12}
					justifyContent="center"
					sx={{ padding: '16px 0', borderBottom: '1px solid', borderColor: 'primary.divider' }}
				>
					<LoadMore handleClick={handleLoadMore} />
				</Grid>
				<Grid item xs={12} sx={{ padding: '16px 0' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '200px',
							backgroundColor: 'primary.grey200',
						}}
					>
						<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Sponsored Content</Typography>
					</Box>
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default ArticlesCategoryList;
