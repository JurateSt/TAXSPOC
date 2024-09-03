import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
