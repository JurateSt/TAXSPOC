// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';

const HotTopicsCard = ({ topic }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				height: '96px',
				paddingLeft: '16px',
				alignItems: 'center',
				gap: '16px',
				// not solid but dashed
				borderBottom: '1px dotted #000000',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					width: '32px',
					height: '32px',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					flexShrink: 0,
					border: '1px solid black',
					borderRadius: '45px',
				}}
			>
				{topic}
			</Box>
			<Box>
				<Box
					sx={{
						fontWeight: 'bold',
					}}
				>
					OECD/G20: BEPS
				</Box>
				<Box>Over 140 countries are implementing 15 Actions.</Box>
			</Box>
		</Box>
	);
};

export default HotTopicsCard;
