import React, { useState, useEffect, useRef } from 'react';
// MUI
import { Container, Box, Grid } from '@mui/material';
// MUI icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// api
import api from '../../api/axios';
// components
import ArticleCardPhoto from './ArticleCardPhoto';
import ArticleCardSubHeader from './ArticleCardSubHeader';
import ArticleCardHeader from './ArticleCardHeader';
import ArticleCardSupportingText from './ArticleCardSupportingText';
import ArticleCardButtons from './ArticleCardButtons';

const ArticleCard = ({ article }) => {
	return (
		<Box
			sx={{
				bgcolor: 'white',
				display: 'flex',
				flexDirection: 'column',
				height: '320px',
				boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				// minHeight: '320px',
				// maxHeight: '400px',
				// overflow: 'hidden',
			}}
		>
			<Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
				<Grid container>
					<ArticleCardPhoto article={article} />
					<Grid container item sx={{ padding: '8px' }} rowSpacing={1}>
						<ArticleCardSubHeader article={article} />

						<ArticleCardHeader article={article} />

						<ArticleCardSupportingText article={article} />
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ padding: '8px' }}>
				<ArticleCardButtons article={article} />
			</Box>
		</Box>

		// <Card>
		// 	<CardHeader subheader="September 14, 2016" title="Shrimp and Chorizo Paella" />
		// 	<CardMedia
		// 		component="img"
		// 		height="194"
		// 		image="/static/images/cards/paella.jpg"
		// 		alt="Paella dish"
		// 	/>
		// 	<CardContent>
		// 		<Typography variant="body2" color="text.secondary">
		// 			This impressive paella is a perfect party dish and a fun meal to cook together with your
		// 			guests. Add 1 cup of frozen peas along with the mussels, if you like.
		// 		</Typography>
		// 	</CardContent>
		// 	<CardActions disableSpacing>
		// 		<IconButton aria-label="add to favorites">
		// 			<FavoriteIcon />
		// 		</IconButton>
		// 		<IconButton aria-label="share">
		// 			<ShareIcon />
		// 		</IconButton>
		// 		{/* <ExpandMore
		// 			expand={expanded}
		// 			onClick={handleExpandClick}
		// 			aria-expanded={expanded}
		// 			aria-label="show more"
		// 		>
		// 			<ExpandMoreIcon />
		// 		</ExpandMore> */}
		// 	</CardActions>
		// </Card>
	);
};

export default ArticleCard;
