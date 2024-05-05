import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
// api
import api from '../api/axios';
// components
import MainBar from '../components/MainBar.jsx';

const Article = () => {
	const { id } = useParams();

	const [article, setArticle] = useState({});

	const getArticle = async () => {
		const { data } = await api.get(`/articles/${id}`);
		console.log('getArticle', data);
		setArticle(data);
	};

	useEffect(() => {
		getArticle();
	}, []);

	return (
		<>
			<MainBar />
			<Container>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h3">{article.header}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1">
							<div dangerouslySetInnerHTML={{ __html: article.content }} />
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body2">{article.source}</Typography>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Article;
