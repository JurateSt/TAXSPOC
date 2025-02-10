// MUI
import { Grid } from '@mui/material';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ArticleCardPhoto = ({ article }) => {
	const { slug } = article;
	const url = `/articles/${slug}`;
	const imageSrc = article ? article?.images[0]?.url : '';
	const imageAlt = article?.images[0]?.alt || 'Article Image';

	return (
		<Grid
			item
			xs={12}
			sx={{
				'&:hover a': {
					opacity: 0.7,
					// transition: 'opacity 0.3s ease-in-out',
				},
			}}
		>
			<a
				href={`${VITE_BASE_URL}${url}`}
				title={article?.header || 'Read full article'}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<figure style={{ margin: 0 }}>
					<img
						src={imageSrc}
						style={{
							width: '100%',
							height: '100%',
							aspectRatio: '16/9',
							objectFit: 'cover',
						}}
						alt={imageAlt}
						loading="lazy"
					/>
				</figure>
			</a>
		</Grid>
	);
};

export default ArticleCardPhoto;
