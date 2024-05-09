// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import HotTopicsHeader from './HotTopicsHeader';
import HotTopicsCardHolder from './HotTopicsCardHolder';

const HotTopicsSidebar = () => {
	return (
		// align Boxes in container by vertical axis
		<Grid
			container
			item
			xs={0}
			sm={0}
			md={4}
			lg={4}
			xl={4}
			// sx={{ border: '1px solid green', flexDirection: 'column' }}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					// backgroundColor: 'blue',
				}}
			>
				<HotTopicsHeader />

				<HotTopicsCardHolder />
			</Box>
		</Grid>
	);
};

export default HotTopicsSidebar;
