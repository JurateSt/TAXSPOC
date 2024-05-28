// MUI
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const ArticleCardHeader = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography
				sx={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					fontWeight: 'bold',
					fontSize: '15px',
					// lineHeight: '1.2em',
				}}
			>
				{article?.header} {dayjs(article?.articleDate).format('MMM D, YYYY')}
			</Typography>
		</Grid>
	);
};

export default ArticleCardHeader;
