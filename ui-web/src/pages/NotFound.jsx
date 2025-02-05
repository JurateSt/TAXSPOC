// React
import { useNavigate } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
// MUI
import { Box, Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const NotFound = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/home');
	};
	return (
		<>
			<Helmet>
				<title>404 – Page Not Found</title>
				<meta name="robots" content="noindex, nofollow" />
				<meta name="description" content="The page you are looking for cannot be found." />
			</Helmet>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh',
					textAlign: 'center',
					px: 2,
				}}
			>
				<h1>Sorry, this page could not be found!</h1>
				<Button variant="outlined" onClick={handleClick}>
					Return to Home
				</Button>
			</Box>
		</>
	);
};

export default NotFound;
