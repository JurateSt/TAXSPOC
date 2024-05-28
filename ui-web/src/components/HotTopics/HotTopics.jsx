// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import HotTopicsHeader from './HotTopicsHeader';
import HotTopicsCardsHolder from './HotTopicsCardsHolder';
import HotTopicsCard from './HotTopicsCard';

const HotTopics = () => {
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
			sx={{
				// border: '3px solid green',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					flexShrink: '0',
					alignSelf: 'auto',
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
					// border: '3px solid red',
				}}
			>
				<HotTopicsHeader />

				<HotTopicsCardsHolder />
			</Box>
		</Grid>
	);
};

export default HotTopics;
