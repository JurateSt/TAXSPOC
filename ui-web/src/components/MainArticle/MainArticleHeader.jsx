// MUI
import { Grid, Typography } from '@mui/material';

const MainArticleHeader = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography
				variant="h5"
				sx={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					fontWeight: 'fontWeightBold',
				}}
			>
				{article?.header}
			</Typography>
		</Grid>
	);
};

export default MainArticleHeader;
