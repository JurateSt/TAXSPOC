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
import path from 'path';

const NavigationBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isOld = location.pathname === '/home2';

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
		{ label: 'OECD BEPS', path: generateCategoryPath('other', 'OECD BEPS') },
		{
			label: 'E-Invoicing and E-Reporting',
			path: generateCategoryPath('other', 'E-Invoicing and E-Reporting'),
		},
		{ label: 'Brazil Tax Reform', path: generateCategoryPath('other', 'Brazil Tax Reform') },
		{ label: 'UAE CIT', path: generateCategoryPath('other', 'UAE CIT') },
	];

	const navigationItems = [
		{ label: 'Home', icon: <HomeOutlinedIcon />, path: '/home', menuItems: [] },
		{ label: 'Hot Topics', path: '/hot-topics', menuItems: hotTopicsMenuItems },
		{
			label: 'Indirect Tax',
			path: generateCategoryPath('other', 'Indirect Tax'),
			menuItems: [],
		},
		{ label: 'Direct Tax', path: generateCategoryPath('other', 'Direct Tax'), menuItems: [] },

		{
			label: 'Transfer Pricing',
			path: generateCategoryPath('other', 'Transfer Pricing'),
			menuItems: [],
		},
		{
			label: 'Tax Technology',
			path: generateCategoryPath('other', 'Tax Technology'),
			menuItems: [],
		},
		{ label: 'Customs', path: generateCategoryPath('other', 'Customs'), menuItems: [] },
	];

	return (
		<Toolbar
			sx={{
				bgcolor: 'background.default',
				// vertical stretch
				alignItems: 'stretch',
				// display: { xs: 'none', md: 'flex' },
				// justifyContent: 'center',
				// padding by screen size
				// padding: { xs: 0, md: 0 },
				// justifyContent: 'space-between',
				// alignItems: 'center',
			}}
		>
			{isMobile ? (
				<>
					{/* <Box sx={{ borderRight: '1px solid', borderColor: 'primary.main' }}> */}
					<IconButton
						edge="start"
						color="primary.main"
						aria-label="menu"
						sx={{ mr: 4 }}
						onClick={handleDrawerOpen}
					>
						<MenuIcon fontSize="large" />
					</IconButton>
					{/* </Box> */}
					<Drawer
						anchor="left"
						open={drawerOpen}
						onClose={handleDrawerClose}
						// PaperProps={{
						// 	sx: { bgcolor: 'primary.midnightBlue200' },
						// }}
					>
						<LogoBar />
						<Toolbar
							sx={{
								bgcolor: 'background.default',
								// display: { xs: 'none', md: 'flex' },
								// justifyContent: 'center',
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
									cursor: 'pointer',
								}}
								onClick={handleClick}
							>
								{isOld ? (
									<img src={LogoOld} style={{ height: '28px', width: 'auto' }} alt="TaxSpoc Logo" />
								) : (
									<img
										src={LogoMain}
										style={{ height: '32px', width: 'auto' }}
										alt="TaxSpoc Logo"
									/>
								)}
							</Box>
						</Toolbar>
						<Box
							sx={{ width: 250 }}
							role="presentation"
							onClick={handleDrawerClose}
							onKeyDown={handleDrawerClose}
						>
							<List>
								{/* <ListItemButton onClick={() => setOpenMenuItems(!openMenuItems)}>
									<CloseIcon />
								</ListItemButton> */}
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
												{/* {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>} */}
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
											{/* {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>} */}
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
							cursor: 'pointer',
						}}
						onClick={handleClick}
					>
						{isOld ? (
							<img src={LogoOld} style={{ height: '18px', width: 'auto' }} alt="TaxSpoc Logo" />
						) : (
							<img src={LogoMain} style={{ height: '24px', width: 'auto' }} alt="TaxSpoc Logo" />
						)}
					</Box>
					{/* current section */}
					{/* <Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'left',
							alignItems: 'center',
							color: 'primary.main',
						}}
					>
						<Typography>{currentSection}</Typography>
					</Box> */}
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
								cursor: 'pointer',
							}}
							onClick={handleClick}
						>
							{isOld ? (
								<img src={LogoOld} style={{ height: '28px', width: 'auto' }} alt="TaxSpoc Logo" />
							) : (
								<img src={LogoMain} style={{ height: '42px', width: 'auto' }} alt="TaxSpoc Logo" />
							)}
						</Box>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'stretch',
								justifyContent: 'space-between',

								// marginRight: '128px',
								// userSelect: 'none',
								// cursor: 'pointer',
							}}
						>
							{navigationItems.map((item, index) => (
								<NavigationLink key={index} to={item.path} menuItems={item.menuItems}>
									{item.label}
								</NavigationLink>
							))}
						</Box>
					</Container>

					{/* <NavigationLink to="/home">
						<HomeOutlinedIcon />
					</NavigationLink>
					<NavigationLink to="/hot-topics" menuItems={hotTopicsMenuItems}>
						Hot Topics
					</NavigationLink>
					<NavigationLink to="/articles/indirect-tax">Indirect Tax</NavigationLink>
					<NavigationLink to="/articles/direct-tax">Direct Tax</NavigationLink>
					<NavigationLink to="/articles/transfer-pricing">Transfer Pricing</NavigationLink>
					<NavigationLink to="/articles/tax-technology">Tax Technology</NavigationLink>
					<NavigationLink to="/articles/customs">Customs</NavigationLink> */}
				</>
			)}
		</Toolbar>
	);
};

export default NavigationBar;
