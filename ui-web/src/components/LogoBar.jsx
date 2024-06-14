import React, { useState } from 'react';
import { Toolbar } from '@mui/material';

const LogoBar = () => {
	return (
		<Toolbar
			sx={{
				justifyContent: 'center',
				minHeight: '32px !important',
				height: '32px !important',
				userSelect: 'none',
			}}
		>
			{/* <img
				src={TaxSpocLogoOriginal}
				alt="TaxSpoc Logo"
				// width={128}
				height={128}
			/> */}
		</Toolbar>
	);
};

export default LogoBar;
