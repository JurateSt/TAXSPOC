// MUI
import { Grid, Typography, Box } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const SectionCategory = ({ category }) => {
	return (
		<Grid item xs={12}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					paddingBottom: '12px',
				}}
			>
				<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>{category}</Typography>
				<ChevronRightOutlinedIcon fontSize="small" />
			</Box>
		</Grid>
	);
};

export default SectionCategory;
