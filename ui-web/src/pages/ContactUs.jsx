import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Box, Container } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';
const ContactUs = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/about-us#contact');
	}, [navigate]);

	return null; // or a loader if the redirection might take time
};

export default ContactUs;
