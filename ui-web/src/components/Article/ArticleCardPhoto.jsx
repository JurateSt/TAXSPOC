// MUI
import { Grid } from '@mui/material';

const ArticleCardPhoto = ({ article }) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	// console.log('backendUrl', `${backendUrl}/${article?.images[0]?.url}`);
	return (
		<Grid item xs={12} sx={{ bgcolor: 'lightblue', height: '100px' }}>
			<img
				src={`${backendUrl}/${article?.images[0]?.url}`}
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				alt="Article"
			/>
		</Grid>
	);
};

export default ArticleCardPhoto;
