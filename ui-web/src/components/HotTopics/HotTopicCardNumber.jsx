// MUI
import { Box } from '@mui/material';

const HotTopicCardNumber = ({ number }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '32px',
				height: '32px',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				flexShrink: 0,
				border: '1px solid',
				borderColor: 'primary.darkText',
				borderRadius: '45px',
			}}
		>
			{number}
		</Box>
	);
};

export default HotTopicCardNumber;
