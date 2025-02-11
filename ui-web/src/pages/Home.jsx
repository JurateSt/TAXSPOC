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

	const jsonLdData = {
		'@context': 'https://schema.org',
		'@type': 'NewsMediaOrganization',
		name: 'Taxspoc',
		url: 'https://www.taxspoc.com/',
		logo: 'https://www.taxspoc.com/logo-dark.png',
		sameAs: ['https://www.linkedin.com/company/taxspoc', 'https://x.com/taxspoc'],
		publisher: {
			'@type': 'Organization',
			name: 'Taxspoc',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.taxspoc.com/logo-dark.png',
			},
		},
	};

	return (
		<>
			<Helmet>
				<title>Taxspoc | Your Single Source for Global Tax</title>
				<link rel="canonical" href="https://www.taxspoc.com/" />
				<meta name="title" content="Taxspoc | Your Single Source for Global Tax" />
				<meta name="description" content="Home description" />
				<meta property="og:title" content="Taxspoc | Your Single Source for Global Tax" />
				<meta
					property="og:description"
					content="Taxspoc is your Single Point of Contact for global and local tax news, providing clear, logical, and well-organized tax information."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.taxspoc.com/" />
				<meta property="og:image" content="https://www.taxspoc.com/logo-dark.png" />
				<meta property="og:site_name" content="Taxspoc" />
				<meta name="twitter:title" content="Taxspoc | Your Single Source for Global Tax" />
				<meta
					name="twitter:description"
					content="Taxspoc is your Single Point of Contact for global and local tax news, providing clear, logical, and well-organized tax information."
				/>
				<meta name="twitter:image" content="https://www.taxspoc.com/logo-dark.png" />
				<script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
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
