import React from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Container, Grid, Button } from '@mui/material';
// components
import CMSLogoBar from '../../components/CMS/LogoBar';
import Bar from '../../components/CMS/Bar';

const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<Bar />
		</>
	);
};

export default Home;
