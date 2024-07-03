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

const TimelineSection = () => (
	<>
		<section className="section intro">
			<div className="container">
				<h1>Timeline</h1>
			</div>
		</section>

		<section className="timeline">
			<div className="info">
				<img width="50" height="50" src="https://assets.codepen.io/210284/face.svg" alt="" />
				<h2>Company History</h2>
				<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</p>
				<p>
					<a href="">Learn more &gt;</a>
				</p>
			</div>

			<ol>
				<li>
					<div>
						<time>1934</time> At vero eos et accusamus et iusto odio dignissimos ducimus qui
						blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos.
					</div>
				</li>
				<li>
					<div>
						<time>1937</time> Proin quam velit, efficitur vel neque vitae, rhoncus commodo mi.
						Suspendisse finibus mauris et bibendum molestie. Aenean ex augue, varius et pulvinar in,
						pretium non nisi.
					</div>
				</li>
				<li>
					<div>
						<time>1940</time> Proin iaculis, nibh eget efficitur varius, libero tellus porta dolor,
						at pulvinar tortor ex eget ligula. Integer eu dapibus arcu, sit amet sollicitudin eros.
					</div>
				</li>
				<li>
					<div>
						<time>1943</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li>
					<div>
						<time>1946</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li>
					<div>
						<time>1956</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li>
					<div>
						<time>1957</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li>
					<div>
						<time>1967</time> Aenean condimentum odio a bibendum rhoncus. Ut mauris felis, volutpat
						eget porta faucibus, euismod quis ante.
					</div>
				</li>
				<li>
					<div>
						<time>1977</time> Vestibulum porttitor lorem sed pharetra dignissim. Nulla maximus, dui
						a tristique iaculis, quam dolor convallis enim, non dignissim ligula ipsum a turpis.
					</div>
				</li>
				<li>
					<div>
						<time>1985</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li>
					<div>
						<time>2000</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li>
					<div>
						<time>2005</time> In mattis elit vitae odio posuere, nec maximus massa varius.
						Suspendisse varius volutpat mattis. Vestibulum id magna est.
					</div>
				</li>
				<li></li>
			</ol>
		</section>

		<footer className="page-footer">
			<span>made by </span>
			<a href="https://georgemartsoukos.com/" target="_blank">
				<img
					width="24"
					height="24"
					src="https://assets.codepen.io/162656/george-martsoukos-small-logo.svg"
					alt="George Martsoukos logo"
				/>
			</a>
		</footer>
	</>
);

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
						<Box sx={{ backgroundColor: 'lightblue', height: '800px' }}>
							<TimelineSection />
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
