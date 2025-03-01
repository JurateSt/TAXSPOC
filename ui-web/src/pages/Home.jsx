import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// api
import api from '../api/axios';
// Helmet
import { Helmet } from 'react-helmet';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import MainBar from '../components/MainBar.jsx';
// import SectionLatest from '../components/Section/SectionLatestOld.jsx';
import SectionLatest from '../components/Section/SectionLatest.jsx';
import Section from '../components/Section/Section.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';

const Home = () => {
	const articlesPerPage = 4;
	const [latestLoaded, setLatestLoaded] = useState(false);
	const [sectionsData, setSectionsData] = useState({});

	const sections = [
		{ category: 'latest' },
		{ category: 'oecd-beps' },
		{ category: 'e-invoicing-and-e-reporting' },
		{ category: 'brazil-tax-reform' },
		{ category: 'uae-cit' },
		{ category: 'indirect-tax' },
		{ category: 'direct-tax' },
		{ category: 'transfer-pricing' },
		{ category: 'tax-technology' },
		{ category: 'customs' },
	];

	const getArticles = async () => {
		const sectionArticles = {};

		await Promise.all(
			sections.map(async (item) => {
				const { data } = await api.get(`/category/${item.category}/limited`);
				sectionArticles[item.category] = {
					articles: data.articles,
					category: data.category,
				};
			})
		);

		setSectionsData(sectionArticles);
	};

	useEffect(() => {
		getArticles();
	}, []);

	const sectionsOld = [
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
				<title>Taxspoc | Latest Global Tax News & Updates</title>
				<link rel="canonical" href="https://www.taxspoc.com/" />
				<meta
					name="description"
					content="Stay updated with the latest global and local tax news. Taxspoc provides clear, well-organized tax insights for professionals and businesses."
				/>
				<meta property="og:title" content="Taxspoc | Global Tax News & Insights" />
				<meta
					property="og:description"
					content="Stay informed with expert tax news, trends, and updates. Taxspoc is your single source for global taxation insights."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.taxspoc.com/" />
				<meta property="og:image" content="https://www.taxspoc.com/logo-dark.png" />
				<meta property="og:site_name" content="Taxspoc" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Taxspoc | Latest Global Tax News & Insights" />
				<meta
					name="twitter:description"
					content="Get the latest tax news, updates, and expert insights from Taxspoc. Your single source for global and local taxation."
				/>
				<meta name="twitter:image" content="https://www.taxspoc.com/logo-dark.png" />

				<meta
					name="keywords"
					content="tax news, global tax updates, taxspoc, taxation trends, indirect tax, direct tax, OECD BEPS, tax technology, e-invoicing, e-reporting, customs, transfer pricing, UAE CIT, Brazil tax reform"
				/>
				<script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
			</Helmet>
			<MainBar />
			<Container
			// sx={{ border: '1px solid blue' }}
			>
				{/* <SectionLatest
					key="latest"
					section={{ category: 'Latest News', type: 'latest' }}
					onLoaded={() => setLatestLoaded(true)}
				/> */}
				<SectionLatest
					key="latest"
					category={sectionsData['latest']?.category}
					articles={sectionsData['latest']?.articles}
				/>
				{sections
					.filter((item) => item.category !== 'latest')
					.map((item, index) => (
						<Section
							key={index}
							category={sectionsData[item.category]?.category}
							articles={sectionsData[item.category]?.articles}
						/>
					))}
				{/* {latestLoaded &&
					sectionsOld.map((item, index) => (
						<Section key={index} section={item} limit={articlesPerPage} customStyles={{}} />
					))} */}
			</Container>
			<BottomContainer />
		</>
	);
};

export default Home;
