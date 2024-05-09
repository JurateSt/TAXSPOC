// MUI
import { Grid } from '@mui/material';

const ArticlePhoto = ({ article }) => {
	return (
		<Grid item xs={12} sx={{ bgcolor: 'lightblue', height: '100px' }}>
			<img src={`http://localhost:3333/${article?.images[0]?.url}`} alt="Article" />
		</Grid>
	);
};

export default ArticlePhoto;
