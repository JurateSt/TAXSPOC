import React from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Container, Grid, Button } from '@mui/material';
// components
import CMSLogoBar from './LogoBar';
const Bar = () => {
	const navigate = useNavigate();

	return (
		<>
			<CMSLogoBar />
			<Container sx={{ mt: 2 }}>
				<Grid container spacing={2} justifyContent="space-between">
					<Grid item>
						<Button variant="contained" onClick={() => navigate('/cms/auth/authors')}>
							Authors
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" onClick={() => navigate('/cms/auth/create-article')}>
							Articles
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained">Categories</Button>
					</Grid>
				</Grid>
				<hr />
			</Container>
		</>
	);
};

export default Bar;
