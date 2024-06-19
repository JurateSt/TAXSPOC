import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Components
import { Box, Toolbar } from '@mui/material';
// Logo
import LogoMain from '../assets/LogoMain.png';
// MUI Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigationLink from './NavigationLink';

const NavigationBar = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/home');
	};

	const hotTopicsMenuItems = [
		{ label: 'OECD/G20: BEPS', path: '/hot-topics/1' },
		{ label: 'E-invoicing', path: '/hot-topics/2' },
		{ label: 'Brazil Tax Reform', path: '/hot-topics/3' },
		{ label: 'UAE CIT', path: '/hot-topics/4' },
	];
	return (
		<Toolbar
			sx={{
				bgcolor: 'primary.midnightBlue200',
				// display: { xs: 'none', md: 'flex' },
				justifyContent: 'center',
				alignItems: 'stretch',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center', // Ensures logo is vertically centered
					marginRight: '128px', // Space between logo and navigation links
					userSelect: 'none',
					cursor: 'pointer',
				}}
				onClick={handleClick}
			>
				<img src={LogoMain} alt="TaxSpoc Logo" />
			</Box>

			<NavigationLink to="/home">
				<HomeOutlinedIcon />
			</NavigationLink>
			<NavigationLink to="/hot-topics" menuItems={hotTopicsMenuItems}>
				Hot Topics
			</NavigationLink>
			<NavigationLink to="/articles/indirect-tax">Indirect Tax</NavigationLink>
			<NavigationLink to="/articles/direct-tax">Direct Tax</NavigationLink>
			<NavigationLink to="/articles/transfer-pricing">Transfer Pricing</NavigationLink>
			<NavigationLink to="/articles/tax-technology">Tax Technology</NavigationLink>
			<NavigationLink to="/articles/customs">Customs</NavigationLink>
		</Toolbar>
	);
};

export default NavigationBar;
