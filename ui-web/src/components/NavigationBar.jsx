import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// MUI Components
import {
	Typography,
	Box,
	Toolbar,
	useMediaQuery,
	IconButton,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	Collapse,
	Container,
} from '@mui/material';
// Logo
import LogoMain from '../assets/LogoMain.svg';
import LogoOld from '../assets/LogoMainOld.png';
// MUI Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
// components
import NavigationLink from './NavigationLink';
import LogoBar from './LogoBar';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const NavigationBar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [drawerOpen, setDrawerOpen] = useState(false);
	const [openMenuItems, setOpenMenuItems] = useState(false);

	const handleClick = () => {
		navigate('/');
	};
	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const generateCategoryPath = (type, category) => {
		const params = new URLSearchParams({ type, category });
		return `/articles/category?${params}`;
	};

	const hotTopicsMenuItems = [
		{
			label: 'OECD BEPS',
			path: '/category/oecd-beps', //generateCategoryPath('other', 'OECD BEPS')
		},
		{
			label: 'E-Invoicing and E-Reporting',
			path: '/category/e-invoicing-and-e-reporting', //generateCategoryPath('other', 'E-Invoicing and E-Reporting'),
		},
		{
			label: 'Brazil Tax Reform',
			path: '/category/brazil-tax-reform', //generateCategoryPath('other', 'Brazil Tax Reform')
		},
		{
			label: 'UAE CIT',
			path: '/category/uae-cit', //generateCategoryPath('other', 'UAE CIT')
		},
	];

	const navigationItems = [
		{ label: 'Home', icon: <HomeOutlinedIcon />, path: '/home', menuItems: [] },
		{ label: 'Hot Topics', path: '/hot-topics', menuItems: hotTopicsMenuItems },
		{
			label: 'Indirect Tax',
			path: '/category/indirect-tax', //generateCategoryPath('other', 'Indirect Tax'),
			menuItems: [],
		},
		{
			label: 'Direct Tax',
			path: '/category/direct-tax', //generateCategoryPath('other', 'Direct Tax'),
			menuItems: [],
		},

		{
			label: 'Transfer Pricing',
			path: '/category/transfer-pricing', //generateCategoryPath('other', 'Transfer Pricing'),
			menuItems: [],
		},
		{
			label: 'Tax Technology',
			path: '/category/tax-technology', //generateCategoryPath('other', 'Tax Technology'),
			menuItems: [],
		},
		{
			label: 'Customs',
			path: '/category/customs', //generateCategoryPath('other', 'Customs'),
			menuItems: [],
		},
	];

	return (
		<Toolbar
			sx={{
				bgcolor: 'background.default',
				alignItems: 'stretch',
			}}
		>
			{isMobile ? (
				<>
					<IconButton
						edge="start"
						color="primary.main"
						aria-label="menu"
						sx={{ mr: 4 }}
						onClick={handleDrawerOpen}
					>
						<MenuIcon fontSize="large" />
					</IconButton>
					<Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
						<LogoBar />
						<Toolbar
							sx={{
								bgcolor: 'background.default',
								alignItems: 'stretch',
							}}
						>
							<IconButton
								edge="start"
								color="primary.main"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={handleDrawerClose}
							>
								<CloseIcon fontSize="large" />
							</IconButton>
							<Box
								sx={{
									flexGrow: 1,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									// cursor: 'pointer',
								}}
								// onClick={handleClick}
							>
								<a href={VITE_BASE_URL}>
									<img
										src={LogoMain}
										style={{ height: '32px', width: 'auto' }}
										alt="TaxSpoc Logo"
									/>
								</a>
							</Box>
						</Toolbar>
						<Box
							sx={{ width: 250 }}
							role="presentation"
							onClick={handleDrawerClose}
							onKeyDown={handleDrawerClose}
						>
							<List>
								{navigationItems.map((item, index) =>
									item.menuItems.length > 0 ? (
										<>
											<ListItemButton
												key={index}
												onClick={(e) => {
													e.stopPropagation();
													setOpenMenuItems(!openMenuItems);
												}}
											>
												<ListItemText primary={item.label} />
												{openMenuItems ? <ExpandLess /> : <ExpandMore />}
											</ListItemButton>
											<Collapse in={openMenuItems} timeout="auto" unmountOnExit>
												<List component="div" disablePadding>
													{item.menuItems.map((menuItem, index) => (
														<ListItemButton
															key={index}
															onClick={() => {
																navigate(menuItem.path);
															}}
															sx={{ pl: 4 }}
														>
															<ListItemText primary={menuItem.label} />
														</ListItemButton>
													))}
												</List>
											</Collapse>
										</>
									) : (
										<ListItemButton
											key={index}
											onClick={() => {
												navigate(item.path);
												handleDrawerClose();
											}}
										>
											<ListItemText primary={item.label} />
										</ListItemButton>
									)
								)}
							</List>
						</Box>
					</Drawer>
					<Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'left',
							alignItems: 'center',
							// cursor: 'pointer',
						}}
						// onClick={handleClick}
					>
						<a href={VITE_BASE_URL}>
							<img src={LogoMain} style={{ height: '24px', width: 'auto' }} alt="TaxSpoc Logo" />
						</a>
					</Box>
				</>
			) : (
				<>
					<Container
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center', // Ensures logo is vertically centered
								marginRight: '32px', // Space between logo and navigation links
								userSelect: 'none',
								// cursor: 'pointer',
							}}
							// onClick={handleClick}
						>
							<a href={VITE_BASE_URL}>
								<img src={LogoMain} style={{ height: '42px', width: 'auto' }} alt="TaxSpoc Logo" />
							</a>
						</Box>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'stretch',
								justifyContent: 'space-between',
							}}
						>
							{navigationItems.map((item, index) => (
								<NavigationLink key={index} to={item.path} menuItems={item.menuItems}>
									{item.label}
								</NavigationLink>
							))}
						</Box>
					</Container>
				</>
			)}
		</Toolbar>
	);
};

export default NavigationBar;
