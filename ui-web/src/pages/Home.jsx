import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import MainBar from '../components/MainBar.jsx';
import SectionLatest from '../components/Section/SectionLatest.jsx';
import Section from '../components/Section/Section.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';

const Home = () => {
	const [latestLoaded, setLatestLoaded] = useState(false);

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
			<MainBar />
			<Container
			// sx={{ border: '1px solid blue' }}
			>
				<SectionLatest
					key="latest"
					section={{ category: 'Latest News' }}
					onLoaded={() => setLatestLoaded(true)}
				/>
				{latestLoaded && sections.map((item, index) => <Section section={item} key={index} />)}
			</Container>
			<BottomContainer />
		</>
	);
};

export default Home;
