// import { useNavigate } from 'react-router-dom';
// MUI
import { Grid } from '@mui/material';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ArticleCardPhoto = ({ article }) => {
	// const navigate = useNavigate();
	const { slug } = article;
	const url = `/articles/${slug}`;
	const imageSrc = article ? article?.images[0]?.url : '';
	// const handleClick = () => {
	// 	navigate(url);
	// };

	return (
		<Grid
			item
			xs={12}
			sx={{
				// bgcolor: 'lightblue',
				// height: '100px',
				'&:hover a': {
					opacity: 0.7,
					// transition: 'opacity 0.3s ease-in-out',
				},
			}}
			// onClick={handleClick}
		>
			<a href={`${VITE_BASE_URL}${url}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<img
					src={imageSrc}
					style={{
						width: '100%',
						height: '100%',
						aspectRatio: '16/9',
						objectFit: 'cover',
					}}
					alt="Article"
					loading="lazy"
				/>
			</a>
		</Grid>
	);
};

export default ArticleCardPhoto;
