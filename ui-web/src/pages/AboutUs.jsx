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
		window.scrollTo(0, 0);
	}, [location]);

	// useEffect(() => {
	// 	if (location.hash === '#contact') {
	// 		const contactSection = document.getElementById('contactUsSection');
	// 		if (contactSection) {
	// 			contactSection.scrollIntoView({ behavior: 'smooth' });
	// 		}
	// 	} else {
	// 		window.scrollTo(0, 0);
	// 	}
	// }, [location]);

	return (
		<>
			<Helmet>
				<title>About Us | Learn About Taxspoc’s Mission and Values</title>
				<meta
					name="description"
					content="Discover Taxspoc’s mission to deliver free, high-quality tax news and expert insights. Learn how we are redefining access to global tax knowledge."
				/>
				<link rel="canonical" href="https://taxspoc.com/about-us" />
				<meta property="og:title" content="About Us | Learn About Taxspoc’s Mission and Values" />
				<meta
					property="og:description"
					content="Discover Taxspoc’s mission to deliver free, high-quality tax news and expert insights. Learn how we are redefining access to global tax knowledge."
				/>
				<meta property="og:url" content="https://taxspoc.com/about-us" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="About Us | Learn About Taxspoc’s Mission and Values" />
				<meta
					name="twitter:description"
					content="Discover Taxspoc’s mission to deliver free, high-quality tax news and expert insights. Learn how we are redefining access to global tax knowledge."
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
