// MUI
import { Grid, Typography } from '@mui/material';

const ArticleSupportingText = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography
				sx={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: 4,
					WebkitBoxOrient: 'vertical',
					fontSize: '14px',
				}}
			>
				{article?.supportingText}
			</Typography>
		</Grid>
	);
};

export default ArticleSupportingText;
