// MUI
import { Grid, Typography, Box } from '@mui/material';
// components
import ArticleCard from './ArticleCard';

const ReadArticleSuggested = ({ articles, currentArticle }) => {
	return (
		<>
			<Grid item xs={12} sx={{ marginTop: '32px' }}>
				<Typography
					sx={{
						margin: '32px 0 16px 0',
						fontSize: '24px',
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: '28px',
					}}
				>
					Suggested Articles:
				</Typography>
			</Grid>
			<Grid container spacing={2}>
				{articles
					.filter((item) => item._id !== currentArticle._id)
					.slice(0, 6)
					.map((item, index) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={6}
							lg={6}
							xl={6}
							// sx={{ border: '1px solid orange' }}
							key={index}
						>
							<ArticleCard key={item.id} article={item} />
						</Grid>
					))}
			</Grid>
		</>
	);
};

export default ReadArticleSuggested;
