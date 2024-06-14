import { useNavigate } from 'react-router-dom';
// MUI
import { Grid } from '@mui/material';

const ArticleCardPhoto = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article;
	const handleClick = () => {
		navigate(`/articles/${id}`);
	};
	return (
		<Grid
			item
			xs={12}
			sx={{ bgcolor: 'lightblue', height: '100px', cursor: 'pointer' }}
			onClick={handleClick}
		>
			<img
				src={article?.images[0]?.url}
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				alt="Article"
			/>
		</Grid>
	);
};

export default ArticleCardPhoto;
