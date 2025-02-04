import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
// MUI
import { Container, Grid } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
import InfoAboutContent from '../components/InfoAbout/InfoAboutContent';

const AboutUs = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.hash === '#contact') {
			const contactSection = document.getElementById('contactUsSection');
			if (contactSection) {
				contactSection.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			window.scrollTo(0, 0);
		}
	}, [location]);

	return (
		<>
			<Helmet>
				<title>About Us - Taxspoc: Your Trusted Tax News Source</title>
				<meta
					name="description"
					content="Taxspoc is your Single Point of Contact for global and local tax news. We provide clear, logical, and well-organized tax information with timely updates and expert analysis on tax regulations worldwide."
				/>
				<link rel="canonical" href="https://taxspoc.com/about-us" />
				<meta property="og:title" content="About Us - Taxspoc: Your Trusted Tax News Source" />
				<meta
					property="og:description"
					content="Taxspoc is your Single Point of Contact for global and local tax news. We provide clear, logical, and well-organized tax information with timely updates and expert analysis on tax regulations worldwide."
				/>
				<meta property="og:url" content="https://taxspoc.com/about-us" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="About Us - Taxspoc: Your Trusted Tax News Source" />
				<meta
					name="twitter:description"
					content="Taxspoc is your Single Point of Contact for global and local tax news. We provide clear, logical, and well-organized tax information with timely updates and expert analysis on tax regulations worldwide."
				/>
			</Helmet>
			<MainBar />
			<Container sx={{ marginTop: '16px' }}>
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
					<InfoAboutContent />
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default AboutUs;
