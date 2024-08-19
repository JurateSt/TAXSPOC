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
import ArticleCardSubHeader from './ArticleCardSubHeader';
import ArticleCardHeader from './ArticleCardHeader';
import ArticleCardSupportingText from './ArticleCardSupportingText';

const ArticleShortCard = ({ index, article }) => {
	return (
		<Box
			sx={{
				// bgcolor: 'white',
				display: 'flex',
				flexDirection: 'column',
				// paddingTop: '12px',
				...(index !== 3 && {
					borderBottom: '1px solid',
					borderColor: 'primary.divider',
				}),
				// border: '2px solid violet',
				// boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				// cursor: index === 0 || index === 1 ? 'default' : 'pointer',
				// minHeight: '320px',
				// maxHeight: '400px',
				// overflow: 'hidden',
			}}
		>
			{/* <Box
			// sx={{ flexGrow: 1, overflow: 'hidden' }}
			> */}
			<Grid container>
				<Grid
					container
					item
					sx={{
						// border: '2px solid yellow',
						paddingBottom: '12px',
					}}
					rowSpacing={1}
				>
					<ArticleCardSubHeader article={article} />
					<ArticleCardHeader article={article} />
					<ArticleCardSupportingText article={article} />
				</Grid>
			</Grid>
			{/* </Box> */}
		</Box>
	);
};

export default ArticleShortCard;
