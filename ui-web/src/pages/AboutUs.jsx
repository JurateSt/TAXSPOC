import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// MUI
import { Box, Container, Grid } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
import InfoAboutSubHeader from '../components/InfoAbout/InfoAboutSubHeader';
import InfoAboutHeader from '../components/InfoAbout/InfoAboutHeader';
import InfoAboutSupportingText from '../components/InfoAbout/InfoAboutSupportingText';
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
			<MainBar />
			{/* <Box sx={{ flex: '1' }}>
				<Container sx={{ mt: 4 }}>
					<h1>About us</h1>
				</Container>
			</Box> */}

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
					{/* <InfoAboutSubHeader /> */}
					{/* <InfoAboutHeader /> */}
					{/* <InfoAboutSupportingText /> */}
					{/* <ReadArticlePhoto article={article} /> */}
					<InfoAboutContent />
					{/* <ReadArticleCategories article={article} /> */}
					{/* <ReadArticleSuggested currentArticle={article} articles={articles} /> */}
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default AboutUs;
