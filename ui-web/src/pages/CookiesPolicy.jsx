import React from 'react';
// MUI
import { Box, Container } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
const CookiesPolicy = () => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<MainBar />
				<Box sx={{ flex: '1' }}>
					<Container sx={{ mt: 4 }}>
						<h1>Cookies Policy</h1>
					</Container>
				</Box>

				<BottomContainer />
			</Box>
		</>
	);
};

export default CookiesPolicy;
