// MUI
import { Grid } from '@mui/material';

const ArticleCardPhoto = ({ article }) => {
	return (
		<Grid item xs={12} sx={{ bgcolor: 'lightblue', height: '100px' }}>
			<img
				src={article?.images[0]?.url}
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				alt="Article"
			/>
		</Grid>
	);
};

export default ArticleCardPhoto;
