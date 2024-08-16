import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
				// bgcolor: 'white',
				display: 'flex',
				flexDirection: 'column',
				paddingBottom: ['12px', '12px', '0px'], // ['xs', 'sm', 'md']
				borderBottom: ['1px solid', '1px solid', 'none'], // ['xs', 'sm', 'md']
				borderColor: ['primary.divider', 'primary.divider', 'none'], // ['xs', 'sm', 'md']
				// border: '1px solid red',
			}}
		>
			<Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
				{/* <Grid container> */}
				<ArticleCardPhoto article={article} />
				<Grid
					container
					item
					// sx={{ padding: '8px' }}
					rowSpacing={1}
				>
					<ArticleCardSubHeader article={article} />

					<ArticleCardHeader article={article} />

					<ArticleCardSupportingText article={article} />
				</Grid>
				{/* </Grid> */}
			</Box>
		</Box>
	);
};

export default ArticleCard;
