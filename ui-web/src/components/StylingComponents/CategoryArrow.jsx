// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
const CategoryArrow = () => {
	return (
		// <Box>
		<DoubleArrowOutlinedIcon
			fontSize="small"
			sx={{
				color: 'primary.deepOrange500',
				marginLeft: '4px',
			}}
		/>
		// </Box>
	);
};

export default CategoryArrow;
