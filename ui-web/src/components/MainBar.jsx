import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Components
import { AppBar } from '@mui/material';

// components
import LogoBar from './LogoBar';
import NavigationBar from './NavigationBar';

const MainBar = () => {
	return (
		<AppBar position="sticky">
			<LogoBar />
			<NavigationBar />
		</AppBar>
	);
};

export default MainBar;
