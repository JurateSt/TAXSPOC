import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography, Box } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// Styling
import SmallOrangeBox from '../StylingComponents/SmallOrangeBox';

const ReadArticleSidePanelCategory = ({ section }) => {
	const navigate = useNavigate();

	const { type, category } = section || {};

	const searchParams = new URLSearchParams({ type, category });
	return (
		<Grid item xs={12}>
			<Box
				component="a"
				href={`/articles/category?${searchParams}`}
				sx={{
					// border: '1px solid blue',
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
					color: 'inherit',
					'&:hover': {
						textDecoration: 'underline',
					},
				}}
			>
				<SmallOrangeBox />
				<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>{category}</Typography>
				<ChevronRightOutlinedIcon fontSize="small" />
			</Box>
		</Grid>
	);
};

export default ReadArticleSidePanelCategory;
