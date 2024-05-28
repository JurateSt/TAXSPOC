// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import HotTopicsCard from './HotTopicsCard';

const HotTopicsCardHolder = ({}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				backgroundColor: '#FFFFFF',
				flexDirection: 'column',
				padding: '0px 16px 8px 16px',
			}}
		>
			{[1, 2, 3, 4].map((item, index) => (
				<HotTopicsCard key={index} topic={item} />
			))}
		</Box>
	);
};

export default HotTopicsCardHolder;
