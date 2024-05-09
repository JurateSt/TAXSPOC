// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
import HotTopicsCard from './HotTopicsCard';
// components

const HotTopicsCardHolder = ({}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				// backgroundColor: 'yellow',
				flexDirection: 'column',
			}}
		>
			{[1, 2, 3, 4].map((item) => (
				<HotTopicsCard topic={item} />
			))}
		</Box>
	);
};

export default HotTopicsCardHolder;
