import React from 'react';
import {
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
import MainBar from '../components/MainBar.jsx';
import pic1 from '../assets/images/pic1.jpeg';
import pic2 from '../assets/images/pic2.jpeg';
import pic3 from '../assets/images/pic3.jpeg';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const HotTopics = () => {
	return (
		<>
			<MainBar />
			<Container sx={{ mt: 32 }}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card sx={{ maxWidth: 345 }}>
							<CardMedia sx={{ height: 140 }} image={pic1} />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Dolor sit amet
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque
									porta nulla, eget euismod lacus aliquam ut. Cras dignissim nec quam eu blandit.
									Phasellus imperdiet quam vehicula, facilisis nisl bibendum, efficitur orci. Donec
									quis vestibulum felis. Class aptent taciti sociosqu ad litora torquent per conubia
									nostra, per inceptos himenaeos. Sed justo arcu, pellentesque ac nisl id, pulvinar
									feugiat leo. Duis ut porta diam. Cras id magna vel elit porta sodales. Nam felis
									nisi, accumsan ornare imperdiet vitae, molestie id tellus.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Share</Button>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card sx={{ maxWidth: 345 }}>
							<CardMedia sx={{ height: 140 }} image={pic2} />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Fusce euismod
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Fusce euismod accumsan volutpat. Nam laoreet rhoncus velit, eu ultrices tortor
									gravida id. Aliquam molestie tortor id magna egestas finibus. Quisque elit massa,
									auctor vel sagittis eget, suscipit vel tortor. Vivamus non dolor commodo, faucibus
									ipsum vitae, feugiat justo. Donec facilisis, augue vel condimentum porttitor,
									metus massa volutpat diam, commodo faucibus purus lorem ac neque. Suspendisse sit
									amet mi ac risus eleifend pretium eget ac sem. Morbi dui lectus, ornare id arcu a,
									accumsan tempor lacus. Mauris cursus, ipsum id mollis blandit, nulla erat porta
									eros, ac placerat eros enim non augue. Curabitur cursus auctor neque vitae
									feugiat. Nulla faucibus ex sed ante sagittis porta.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Share</Button>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card sx={{ maxWidth: 345 }}>
							<CardMedia sx={{ height: 140 }} image={pic3} />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Cras laoreet
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Cras laoreet ex eu purus volutpat, ut porttitor lacus pellentesque. Quisque
									fringilla at magna nec facilisis. Etiam et tempor ante, vitae pharetra risus.
									Vivamus auctor blandit nulla, sed gravida metus mollis et. Proin quis orci sed
									tellus tempus dignissim sit amet a justo. In ultricies ligula scelerisque lacus
									eleifend, vel rutrum leo congue. Nulla ultrices mauris nec dolor congue finibus.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Share</Button>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default HotTopics;
