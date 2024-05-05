import React, { useState } from 'react';
// MUI Components
import { Container } from '@mui/material';

const MainContainer = ({ children }) => {
	<Container maxWidth="sm">{children}</Container>;
};

export default MainContainer;
