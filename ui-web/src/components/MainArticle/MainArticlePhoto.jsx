import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Button } from '@mui/material';

const MainArticlePhoto = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article || {};
	const url = `/articles/${id}`;

	const handleClick = () => {
		navigate(url);
	};
	return (
		// <Grid
		// 	item
		// 	xs={12}
		// 	sm={6}
		// 	md={8}
		// 	lg={8}
		// 	xl={8}
		// 	sx={{
		// 		// border: '1px solid green',
		// 		// backgroundColor: 'lightblue',
		// 		// height: '180px',
		// 		height: '210px',
		// 		// cursor: 'pointer',
		// 		'&:hover a': {
		// 			opacity: 0.7,
		// 			// transition: 'opacity 0.3s ease-in-out',
		// 		},
		// 		order: { xs: 1, sm: 2 },
		// 	}}
		// >
		<a href={url} style={{ textDecoration: 'none', color: 'inherit' }}>
			<img
				src={article?.images?.[0]?.url}
				style={{
					width: '100%',
					height: '100%',
					aspectRatio: '16/9',
					objectFit: 'cover',
				}}
				alt="Main Article"
				loading="lazy"
				onClick={handleClick}
			/>
		</a>
		// </Grid>
	);
};

export default MainArticlePhoto;
