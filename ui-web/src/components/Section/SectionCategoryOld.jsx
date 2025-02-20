import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography, Box } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// Styling
import SmallOrangeBox from '../StylingComponents/SmallOrangeBox';
import CategoryArrow from '../StylingComponents/CategoryArrow';

const SectionCategory = ({ section }) => {
	const navigate = useNavigate();

	const { type, category } = section || {};

	const searchParams = new URLSearchParams({ type, category });
	return (
		<Grid item xs={12} sx={{ paddingBottom: '12px' }}>
			<Box
				component="a"
				href={`/articles/category?${searchParams}`}
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
				<SmallOrangeBox />
				<Typography sx={{ fontSize: '18px', fontWeight: '700' }}>
					{/* {category.toUpperCase()} */}
					{category}
				</Typography>
				<CategoryArrow />

				{/* <ChevronRightOutlinedIcon /> */}
			</Box>
		</Grid>
	);
};

export default SectionCategory;
