// MUI
import { AppBar, Container, Grid, Typography, Box } from '@mui/material';

const ReadArticlePhoto = ({ article }) => {
	return (
		<Grid item xs={12}>
			<img
				src={article?.images?.[0]?.url}
				style={{ width: '100%', height: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
				alt={article?.header}
			/>
		</Grid>
	);
};

export default ReadArticlePhoto;
