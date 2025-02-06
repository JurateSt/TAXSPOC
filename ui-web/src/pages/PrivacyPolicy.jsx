import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
// MUI
import { Container, Grid } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
import PrivacyPolicyContent from '../components/InfoAbout/PrivacyPolicyContent';

const PrivacyPolicy = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Helmet>
				<title>Privacy Policy | Your Data and Taxspoc’s Commitment</title>
				<meta
					name="description"
					content="Review Taxspoc’s privacy policy to understand how we collect, store, and protect your data. Transparency and security are our top priorities."
				/>
				<link rel="canonical" href="https://www.taxspoc.com/privacy-policy" />
				<meta property="og:title" content="Privacy Policy | Your Data and Taxspoc’s Commitment" />
				<meta
					property="og:description"
					content="Review Taxspoc’s privacy policy to understand how we collect, store, and protect your data. Transparency and security are our top priorities."
				/>
				<meta property="og:url" content="https://www.taxspoc.com/privacy-policy" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Privacy Policy | Your Data and Taxspoc’s Commitment" />
				<meta
					name="twitter:description"
					content="Review Taxspoc’s privacy policy to understand how we collect, store, and protect your data. Transparency and security are our top priorities."
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
					<PrivacyPolicyContent />
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default PrivacyPolicy;
