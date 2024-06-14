// MUI
import { Container, Box, Grid, AppBar } from '@mui/material';
const BottomContainer = () => {
	//move to boottom of the page
	return (
		<Container
			maxWidth={false}
			sx={{ backgroundColor: 'black', height: '300px', marginTop: '32px' }}
		>
			Bottom Bar{' '}
		</Container>
	);
};

export default BottomContainer;
