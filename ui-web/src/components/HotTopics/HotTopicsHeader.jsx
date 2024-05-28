// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';

const HotTopicsHeader = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '64px',
				backgroundColor: 'primary.midnightBlue800',
				color: 'background.default',
				padding: '16px',
				width: '100%',
			}}
		>
			Hot Topics
		</Box>
	);
};

export default HotTopicsHeader;
