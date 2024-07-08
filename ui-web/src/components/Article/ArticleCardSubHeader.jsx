// MUI
import { Grid, Typography } from '@mui/material';

const ArticleCardSubHeader = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography
				noWrap
				sx={{
					fontWeight: '400',
					fontSize: '12px',
					lineHeight: '18px',
					color: 'primary.darkText',
				}}
			>
				{article?.subHeader}
			</Typography>
		</Grid>
	);
};

export default ArticleCardSubHeader;
