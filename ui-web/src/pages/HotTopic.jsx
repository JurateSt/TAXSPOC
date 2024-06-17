import React from 'react';
import { useParams } from 'react-router-dom';
// MUI
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	Paper,
	Container,
} from '@mui/material';

import { styled } from '@mui/material/styles';
// components
import MainBar from '../components/MainBar.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer.jsx';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const HotTopics = () => {
	const { number } = useParams();
	return (
		<>
			<MainBar />
			<Container
				sx={{
					marginTop: '32px',
					// border: '1px solid red'
				}}
				minHeight="100vh"
			>
				<Grid container sx={{ border: '3px solid green' }}>
					<Grid item xs={12} sm={12}>
						<Box sx={{ backgroundColor: 'lightblue', height: '128px' }}>TIMELINE</Box>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Box
							sx={{ backgroundColor: 'lightgreen', height: '128px' }}
						>{`WHAT IT IS number: ${number}`}</Box>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Box sx={{ backgroundColor: 'lightyellow', height: '128px' }}>{`Background`}</Box>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Box sx={{ backgroundColor: 'lightviolet', height: '128px' }}>{`Specific`}</Box>
					</Grid>
				</Grid>
			</Container>

			<BottomContainer />
		</>
	);
};

export default HotTopics;
