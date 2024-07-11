// MUI
import { Grid, Typography, Box } from '@mui/material';
// components
import ArticleCard from './ArticleCard';

const ReadArticleSuggested = ({ articles }) => {
	return (
		<>
			<Grid item xs={12} sx={{ marginTop: '32px' }}>
				<Typography>Suggested Articles:</Typography>
			</Grid>
			<Grid container spacing={2}>
				{articles.slice(0, 6).map((item, index) => (
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
		// <Box
		// 	name="suggested-articles-header"
		// 	sx={{
		// 		display: 'flex',
		// 		// padding: '16px 16px',
		// 		flexDirection: 'column',
		// 		width: '100%',
		// 	}}
		// >
		// 	<Box sx={{ padding: '16px 0' }}>
		// 		<Typography>Suggested Articles:</Typography>
		// 	</Box>
		// 	<Box
		// 		name="suggested-articles-list"
		// 		display={{ display: 'flex', flexDirection: 'column', padding: 0 }}
		// 	>
		// 		<Grid container spacing={2}>
		// 			{articles.slice(0, 6).map((item, index) => (
		// 				<Grid
		// 					item
		// 					xs={12}
		// 					sm={6}
		// 					md={6}
		// 					lg={6}
		// 					xl={6}
		// 					// sx={{ border: '1px solid orange' }}
		// 					key={index}
		// 				>
		// 					<ArticleCard key={item.id} article={item} />
		// 				</Grid>
		// 			))}
		// 		</Grid>
		// 	</Box>
		// </Box>
	);
};

export default ReadArticleSuggested;
