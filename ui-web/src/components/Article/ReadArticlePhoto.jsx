// MUI
import { Grid } from '@mui/material';

const ReadArticlePhoto = ({ article }) => {
	return (
		<Grid item xs={12}>
			<figure style={{ margin: 0 }}>
				<img
					alt={article?.images?.[0]?.alt || article?.header || 'Article Image'}
					src={article?.images?.[0]?.url}
					style={{
						width: '100%',
						height: '100%',
						aspectRatio: '16/9',
						objectFit: 'cover',
					}}
				/>
				{article?.images?.[0]?.caption && (
					<figcaption
						style={{ display: 'block', fontSize: '12px', lineHeight: '1.4', marginTop: '-4px' }}
					>
						<span>{article?.images?.[0]?.caption || article?.header}</span>
					</figcaption>
				)}
			</figure>
		</Grid>
	);
};

export default ReadArticlePhoto;
