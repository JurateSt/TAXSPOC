import React from 'react';
import { useParams } from 'react-router-dom';
// MUI
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import MainBar from '../components/MainBar.jsx';
import BottomContainer from '../components/BottomBar/BottomContainer';
import HorizontalTimeline from '../components/Timeline/HorizontalTimeline';

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
					mt: 4,
					overflowX: 'auto',
					minHeight: '100vh',
					// border: '1px solid red'
				}}
			>
				<Grid container sx={{ border: '3px solid green' }}>
					<Grid item xs={12} sm={12}>
						<Typography variant="h4">
							{number === '1'
								? 'OECD BEPS'
								: number === '2'
									? 'E-Invoicing'
									: number === '3'
										? 'Brazil Tax Reform'
										: 'UAE CIT'}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<HorizontalTimeline />
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
