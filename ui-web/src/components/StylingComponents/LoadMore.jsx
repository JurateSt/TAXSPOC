// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';

const LoadMore = ({ handleClick }) => {
	const currentUrl = window.location.href;
	return (
		<Box
			component="a"
			href={currentUrl}
			sx={{
				display: 'flex',
				alignItems: 'center',
				textDecoration: 'none',
				cursor: 'pointer',
				color: 'inherit',
				'&:hover': {
					textDecoration: 'underline',
				},
			}}
			// onClick={handleClick}
			onClick={(e) => {
				e.preventDefault(); // Prevent the anchor from navigating
				handleClick(); // Increase the page limit
			}}
		>
			<DoubleArrowOutlinedIcon
				fontSize="small"
				sx={{
					rotate: '90deg',
					color: 'primary.deepOrange500',
					marginRight: '8px',
				}}
			/>
			<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Load more articles</Typography>
			<DoubleArrowOutlinedIcon
				sx={{
					rotate: '90deg',
					color: 'primary.deepOrange500',
					marginLeft: '8px',
				}}
				fontSize="small"
			/>
		</Box>
	);
};

export default LoadMore;
