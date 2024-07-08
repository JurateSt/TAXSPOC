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
				backgroundColor: 'primary.deepOrange400',
				color: 'primary.lightText',
				padding: '16px',
				width: '100%',
			}}
		>
			<Typography variant="h6">Hot Topics</Typography>
		</Box>
	);
};

export default HotTopicsHeader;
