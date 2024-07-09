import { useNavigate } from 'react-router-dom';
// MUI
import { Grid } from '@mui/material';

const ArticleCardPhoto = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article;
	const url = `/articles/${id}`;
	const handleClick = () => {
		navigate(url);
	};
	return (
		<Grid
			item
			xs={12}
			sx={{
				// bgcolor: 'lightblue',
				height: '100px',
				'&:hover a': {
					opacity: 0.7,
					// transition: 'opacity 0.3s ease-in-out',
				},
			}}
			onClick={handleClick}
		>
			<a href={url} style={{ textDecoration: 'none', color: 'inherit' }}>
				<img
					src={article?.images[0]?.url}
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					alt="Article"
				/>
			</a>
		</Grid>
	);
};

export default ArticleCardPhoto;
