import React, { useState } from 'react';
import { Toolbar, Typography } from '@mui/material';

const LogoBar = () => {
	return (
		<Toolbar
			sx={{
				justifyContent: 'center',
				minHeight: '32px !important',
				height: '32px !important',
				userSelect: 'none',
				// bgcolor: //'primary.text',
				borderBottom: '1px solid',
				borderBottomColor: 'primary.divider',
			}}
		>
			<Typography variant="logoText">Your Single Source for Global Tax</Typography>
		</Toolbar>
	);
};

export default LogoBar;
