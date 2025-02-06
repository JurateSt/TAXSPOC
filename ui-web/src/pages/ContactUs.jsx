import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
// MUI
import { Container, Grid } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
import ContactUsContent from '../components/InfoAbout/ContactUsContent';

const ContactUs = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Helmet>
				<title>Cookie Policy | How Taxspoc Uses Cookies</title>
				<meta
					name="description"
					content="Learn how Taxspoc uses cookies to improve your experience. Review our cookie policy to understand what data is collected and how it’s used."
				/>
				<link rel="canonical" href="https://www.taxspoc.com/cookies-policy" />
				<meta property="og:title" content="Cookie Policy | How Taxspoc Uses Cookies" />
				<meta
					property="og:description"
					content="Learn how Taxspoc uses cookies to improve your experience. Review our cookie policy to understand what data is collected and how it’s used."
				/>
				<meta property="og:url" content="https://www.taxspoc.com/cookies-policy" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Cookie Policy | How Taxspoc Uses Cookies" />
				<meta
					name="twitter:description"
					content="Learn how Taxspoc uses cookies to improve your experience. Review our cookie policy to understand what data is collected and how it’s used."
				/>
			</Helmet>
			<MainBar />
			<Container sx={{ marginTop: '16px' }}>
				<Grid container item rowSpacing={2} xs={12} sm={12} md={8} lg={8} xl={8}>
					<ContactUsContent />
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default ContactUs;

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // MUI
// import { Box, Container } from '@mui/material';
// // components
// import MainBar from '../components/MainBar';
// import BottomContainer from '../components/BottomBar/BottomContainer';
// const ContactUs = () => {
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		navigate('/about-us#contact');
// 	}, [navigate]);

// 	return null; // or a loader if the redirection might take time
// };

// export default ContactUs;
