// MUI
import { Grid, Typography, Box } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const SectionCategory = ({ category }) => {
	return (
		<Grid item xs={12} sx={{ paddingBottom: '12px' }}>
			{/* <a
				href="#"
				style={{
					textDecoration: 'none',
					color: 'inherit',
					'&:hover': {
						textDecoration: 'underline',
					},
				}}
			> */}
			<Box
				component="a"
				href="#"
				sx={{
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
					color: 'inherit',
					'&:hover': {
						textDecoration: 'underline',
					},
				}}
			>
				<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>{category}</Typography>
				<ChevronRightOutlinedIcon fontSize="small" />
			</Box>
			{/* </a> */}
		</Grid>
	);
};

export default SectionCategory;
