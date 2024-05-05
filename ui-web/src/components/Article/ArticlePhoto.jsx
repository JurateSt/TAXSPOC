// MUI
import { Grid } from '@mui/material';

const ArticlePhoto = ({ article }) => {
	return (
		<Grid item xs={12} sx={{ bgcolor: 'lightblue', height: '100px' }}>
			{article?.photoUrl}
		</Grid>
	);
};

export default ArticlePhoto;
