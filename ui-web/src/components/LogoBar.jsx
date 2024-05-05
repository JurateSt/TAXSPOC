import React, { useState } from 'react';
import { Toolbar } from '@mui/material';
import TaxSpocLogoOriginal from '../assets/TaxspocLogoOriginal.png';

const LogoBar = () => {
	return (
		<Toolbar sx={{ justifyContent: 'center' }}>
			<img
				src={TaxSpocLogoOriginal}
				alt="TaxSpoc Logo"
				// width={128}
				height={128}
			/>
		</Toolbar>
	);
};

export default LogoBar;
