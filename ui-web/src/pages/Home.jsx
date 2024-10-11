import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import MainBar from '../components/MainBar.jsx';
import SectionLatest from '../components/Section/SectionLatest.jsx';
import Section from '../components/Section/Section.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';

const Home = () => {
	const [latestLoaded, setLatestLoaded] = useState(false);
	const articlesPerPage = 4;

	const sections = [
		// { category: 'Latest News', type: 'latest', param: 'latest' },
		{ category: 'OECD BEPS', type: 'other' },
		{ category: 'E-Invoicing and E-Reporting', type: 'other' },
		{ category: 'Brazil Tax Reform', type: 'other' },
		{ category: 'UAE CIT', type: 'other' },
		{ category: 'Indirect Tax', type: 'other' },
		{ category: 'Direct Tax', type: 'other' },
		{ category: 'Transfer Pricing', type: 'other' },
		{ category: 'Tax Technology', type: 'other' },
		{ category: 'Customs', type: 'other' },
	];

	return (
		<>
			<Helmet>
				<title>Home</title>
				<meta name="title" content="Home" />
				<meta name="description" content="Home description" />
				<meta property="og:title" content="Home" />
				<meta property="og:description" content="Home description" />
			</Helmet>
			<MainBar />
			<Container
			// sx={{ border: '1px solid blue' }}
			>
				<SectionLatest
					key="latest"
					section={{ category: 'Latest News', type: 'latest' }}
					onLoaded={() => setLatestLoaded(true)}
				/>
				{latestLoaded &&
					sections.map((item, index) => (
						<Section key={index} section={item} limit={articlesPerPage} customStyles={{}} />
					))}
			</Container>
			<BottomContainer />
		</>
	);
};

export default Home;
