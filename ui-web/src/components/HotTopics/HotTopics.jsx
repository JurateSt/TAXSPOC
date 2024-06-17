// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import HotTopicsHeader from './HotTopicsHeader';
import HotTopicCard from './HotTopicCard';

const HotTopics = () => {
	const hotTopicsData = [
		{
			number: 1,
			header: 'OECD/G20: BEPS',
			supportingText: 'Over 140 countries are implementing 15 Actions.',
		},
		{
			number: 2,
			header: 'E-invoicing',
			supportingText:
				'Electronic invoicing, commonly referred to as e-invoicing, is quickly becoming obligatory on a global scale.',
		},
		{
			number: 3,
			header: 'Brazil Tax Reform',
			supportingText:
				'Brazil is finally adopting numerous Tax changes concerning Transfer Pricing and Indirect Taxes.',
		},
		{
			number: 4,
			header: 'UAE CIT',
			supportingText: 'UAE introduces a federal Corporate Tax.',
		},
	];
	return (
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

				<Box
					sx={{
						display: 'flex',
						backgroundColor: '#FFFFFF',
						flexDirection: 'column',
						padding: '0px 16px 8px 16px',
					}}
				>
					{hotTopicsData.map((item, index) => (
						<HotTopicCard key={index} topic={item} />
					))}
				</Box>
			</Box>
		</Grid>
	);
};

export default HotTopics;
