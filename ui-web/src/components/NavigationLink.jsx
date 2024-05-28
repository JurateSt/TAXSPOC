import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Typography, Link, Menu, MenuItem } from '@mui/material';

const NavigationLink = ({ to, children, menuItems = [] }) => {
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const isActive = location.pathname === to;

	const handleClick = (event) => {
		menuItems.length > 0 && event.preventDefault();
		if (menuItems.length === 0) {
			return;
		}
		anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Link
			className="navigation-link"
			component={RouterLink}
			to={to}
			onClick={handleClick}
			sx={{
				color: 'primary.main',
				borderBottom: isActive ? '2px solid' : '2px solid transparent',
				borderColor: isActive ? 'primary.main' : 'transparent',
				'&:hover': {
					borderColor: 'primary.main',
				},
			}}
		>
			<Typography variant="navigationText">{children}</Typography>
			<Menu
				// className="navigation-link-menu"
				// sx={{ backgroundColor: '#A8BBCC' }}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{menuItems.map((item, index) => (
					<MenuItem key={index} onClick={handleClose} component={RouterLink} to={item.path}>
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</Link>
	);
};

export default NavigationLink;
