// React
import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// MUI
import { Typography, Link, Menu, MenuItem } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const NavigationLink = ({ to, children, menuItems = [] }) => {
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const hasMenu = menuItems.length > 0;

	const isActive = () => {
		if (location.pathname === '/articles/category' && to.startsWith('/articles/category')) {
			const currentParams = new URLSearchParams(location.search);
			const toParams = new URLSearchParams(to.split('?')[1]);
			// console.log('isActive', location.pathname, currentParams, to);

			return Array.from(toParams.entries()).every(
				([key, value]) => currentParams.get(key) === value
			);
		}
		return location.pathname.includes(to);
	};

	const handleClick = (event) => {
		if (hasMenu) {
			event.preventDefault();
			setAnchorEl(anchorEl ? null : event.currentTarget);
		}
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
				color: 'primary.text',
				borderBottom: isActive() ? '3px solid' : '3px solid transparent',
				borderColor: isActive() ? 'primary.deepOrange500' : 'transparent',
				'&:hover': {
					borderColor: 'primary.deepOrange500',
				},
			}}
		>
			<Typography variant="navigationText">{children}</Typography>
			{hasMenu && (open ? <ExpandLess /> : <ExpandMore />)}
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
