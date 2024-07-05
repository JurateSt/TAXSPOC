import { useNavigate } from 'react-router-dom';
// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
// components
import HotTopicCardNumber from './HotTopicCardNumber';

const HotTopicCard = ({ topic }) => {
	const navigate = useNavigate();
	const url = `/hot-topics/${topic.number}`;

	const handleClick = () => {
		navigate(url);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				height: '128px',
				paddingLeft: '16px',
				alignItems: 'center',
				gap: '16px',
				borderBottom: '1px dotted #000000',
				cursor: 'pointer',
				// border: '1px solid red',
				'&:hover': {
					backgroundColor: 'primary.midnightBlue25',
				},
			}}
			onClick={handleClick}
		>
			{/* <a href={url} style={{ textDecoration: 'none', color: 'inherit' }}> */}
			<HotTopicCardNumber number={topic.number} />
			<Box>
				<Box
					sx={{
						fontWeight: 'bold',
					}}
				>
					{topic.header}
				</Box>
				<Box>{topic.supportingText}</Box>
			</Box>
			{/* </a> */}
		</Box>
	);
};

export default HotTopicCard;
