// MUI
import { Grid, Typography } from '@mui/material';

const ArticleCardSubHeader = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography noWrap sx={{ fontWeight: '100', fontStyle: 'italic', fontSize: '13px' }}>
				{article?.subHeader}
			</Typography>
		</Grid>
	);
};

export default ArticleCardSubHeader;
