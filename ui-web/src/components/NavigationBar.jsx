import React, { useState } from 'react';
// MUI Components
import { Box, Toolbar } from '@mui/material';
// MUI Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigationLink from './NavigationLink';

const NavigationBar = () => {
	const hotTopicsMenuItems = [
		{ label: 'Hot Topics Europe', path: '/hot-topics' },
		{ label: 'Hot Topics USA', path: '/hot-topics-usa' },
	];
	return (
		<Toolbar
			className="navigation-bar"
			sx={{
				bgcolor: 'primary.midnightBlue200',
				display: { xs: 'none', md: 'flex' },
			}}
		>
			<Box className="navigation-bar-box">
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
			</Box>
		</Toolbar>
	);
};

export default NavigationBar;
