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
	IconButton,
	List,
	ListItem,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CircleIcon from '@mui/icons-material/Circle';
import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
} from '@mui/lab';

import { styled } from '@mui/material/styles';
// css
// import '../Timeline.css';
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

const HorizontalTimeline = () => {
	const data = [
		{
			year: '2024',
			model: 'Clearance Model',
			countries: ['Italy', 'Ghana', 'Philippines', 'Bolivia', 'Paraguay', 'Saudi Arabia', 'Kenya'],
			position: 'above',
		},
		{
			year: '2024',
			model: 'Post-Audit Model',
			countries: ['Denmark (Optional)'],
			position: 'below',
		},
		{
			year: '2024',
			model: 'Other',
			countries: [
				'Dominican Republic',
				'Israel',
				'Romania',
				'Mauritius',
				'Zambia',
				'Malaysia',
				'Botswana',
				'Greece (B2G)',
			],
			position: 'above',
		},
		{
			year: '2024',
			model: 'Post-Audit Model',
			countries: ['Denmark (Optional)'],
			position: 'below',
		},
		{ year: '2025', model: 'Clearance Model', countries: ['Uruguay'], position: 'above' },
		{
			year: '2025',
			model: 'Post-Audit Model',
			countries: ['Germany***', 'Slovakia'],
			position: 'below',
		},
		{ year: '2025', model: 'Other', countries: ['Spain - Biscaya'], position: 'above' },
		{ year: '2026 January', model: 'Other', countries: ['Belgium', 'Croatia'], position: 'below' },
		{ year: '2026 February', model: 'Clearance Model', countries: ['Poland'], position: 'above' },
		{ year: '2026 July', model: 'Other', countries: ['UAE'], position: 'below' },
		{
			year: '2026 September',
			model: 'Post-Audit Model',
			countries: ['Germany'],
			position: 'above',
		},
		{ year: '2028-2030** January', model: 'VIDA', countries: ['EU'], position: 'below' },
	];

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 2,
				fontSize: 12,
			}}
		>
			{data.map((item, index) => (
				<Box
					key={index}
					sx={{
						width: 200,
						textAlign: 'center',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{/* Card positioned based on item position */}
					<Card
						sx={{
							mb: item.position === 'above' ? 36 : 0,
							mt: item.position === 'below' ? 24 : 0,
							zIndex: 1,
						}}
					>
						<CardContent>
							<Typography color="text.secondary" sx={{ fontSize: 12 }}>
								{item.year}
							</Typography>
							<Typography variant="h6" component="div" gutterBottom sx={{ fontSize: 14 }}>
								{item.model}
							</Typography>
							<List dense sx={{ fontSize: 12 }}>
								{item.countries.map((country, idx) => (
									<ListItem key={idx} sx={{ padding: '0 8px' }}>
										<Typography variant="body2">{country}</Typography>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>

					{/* Vertical connector from card to dot */}
					{item.position === 'above' ? (
						<Box
							sx={{
								position: 'absolute',
								top: '0',
								bottom: '50%', // Extend from the card to the dot
								left: '50%',
								width: '2px',
								bgcolor: 'primary.main',
								zIndex: 0,
							}}
						/>
					) : (
						<Box
							sx={{
								position: 'absolute',
								top: '50%', // Start from the dot to the card
								bottom: '0',
								left: '50%',
								width: '2px',
								bgcolor: 'primary.main',
								zIndex: 0,
							}}
						/>
					)}

					<IconButton
						color="primary"
						sx={{
							position: 'absolute',
							top: '50%', // Center the icon vertically
							transform: 'translateY(-50%)', // Ensure it is exactly centered regardless of the card position
							zIndex: 2,
						}}
					>
						{/* <EventNoteIcon /> */}
						<CircleIcon fontSize="small" />
						{/* <Typography
							variant="caption"
							sx={{
								position: 'absolute',
								top: '100%',
								width: '100%',
								left: '50%',
								transform: 'translateX(-50%)',
							}}
						>
							{item.year}
						</Typography> */}
					</IconButton>
					{/* Connector line */}
					{index < data.length - 1 && (
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								width: '100%',
								height: 2,
								bgcolor: 'primary.main',
								zIndex: 0,
							}}
						/>
					)}
				</Box>
			))}
		</Box>
	);
};

const HotTopics = () => {
	const { number } = useParams();

	// const years = [2024, 2023, 2022, 2021];

	const events = [
		{ year: '2024', position: 'top' },
		{ year: '2023', position: 'bottom' },
		{ year: '2022', position: 'top' },
		{ year: '2021', position: 'bottom' },
	];
	return (
		<>
			<MainBar />
			<Container
				sx={{
					marginTop: '32px',
					overflowX: 'auto',
					minHeight: '100vh',
					// border: '1px solid red'
				}}
			>
				<Grid
					container
					// sx={{ border: '3px solid green' }}
				>
					<Grid item xs={12} sm={12}>
						<Box
							sx={{
								// backgroundColor: 'lightblue',
								width: '100%',
								overflowX: 'auto',
							}}
						>
							<Box sx={{ display: 'inline-flex' }}>
								<HorizontalTimeline />
							</Box>
						</Box>
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
