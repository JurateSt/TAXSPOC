// MUI
import { Grid } from '@mui/material';
// Styling
import SmallOrangeBox from '../StylingComponents/SmallOrangeBox';
import CategoryArrow from '../StylingComponents/CategoryArrow';

const SectionCategory = ({ category }) => {
	return (
		<Grid item xs={12} sx={{ paddingBottom: '12px' }}>
			<a
				href={`/category/${category?.slug}`}
				className="flex items-center text-inherit no-underline hover:underline"
			>
				{/* <Box
				component="a"
				href={`/category/${category}`}
				sx={{
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
					color: 'inherit',
					'&:hover': {
						textDecoration: 'underline',
					},
				}}
			> */}
				<SmallOrangeBox />
				<h1 className="text-lg font-bold m-0">{category?.name}</h1>
				<CategoryArrow />
			</a>
			{/* </Box> */}
		</Grid>
	);
};

export default SectionCategory;
