import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
// MUI
import { Container, Grid } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
import TermsOfUseContent from '../components/InfoAbout/TermsOfUseContent';

const TermsOfUse = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Helmet>
				<title>Terms of Use | Legal Guidelines for Using Taxspoc</title>
				<meta
					name="description"
					content="Read Taxspoc’s Terms of Use to understand the guidelines, rights, and responsibilities when using our tax news platform. Stay informed and compliant."
				/>
				<link rel="canonical" href="https://www.taxspoc.com/terms-of-use" />
				<meta property="og:title" content="Terms of Use | Legal Guidelines for Using Taxspoc" />
				<meta
					property="og:description"
					content="Read Taxspoc’s Terms of Use to understand the guidelines, rights, and responsibilities when using our tax news platform. Stay informed and compliant."
				/>
				<meta property="og:url" content="https://www.taxspoc.com/terms-of-use" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Terms of Use | Legal Guidelines for Using Taxspoc" />
				<meta
					name="twitter:description"
					content="Read Taxspoc’s Terms of Use to understand the guidelines, rights, and responsibilities when using our tax news platform. Stay informed and compliant."
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
					<TermsOfUseContent />
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default TermsOfUse;
