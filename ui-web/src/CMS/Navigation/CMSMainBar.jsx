import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Components
import { AppBar } from '@mui/material';

// components
import LogoBar from './LogoBar';
import NavigationBar from './NavigationBar';

const CMSMainBar = () => {
	return (
		<AppBar
			position="sticky"
			// remove shadow
			elevation={0}
			sx={{
				borderBottom: '1px solid',
				borderBottomColor: 'primary.divider',
				// marginBottom: '32px',
			}}
		>
			<LogoBar />
			<NavigationBar />
		</AppBar>
	);
};

export default CMSMainBar;
