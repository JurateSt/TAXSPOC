import React, { useState, useEffect, useRef } from 'react';
// MUI
import { Container, Box, Grid } from '@mui/material';

// components
import MainArticlePhoto from './MainArticlePhoto';
import MainArticleHeader from './MainArticleHeader';
import MainArticleSupportingText from './MainArticleSupportingText';
import MainArticleButtons from './MainArticleButtons';
import MainArticleRotate from './MainArticleRotate';

const MainArticle = ({ articles }) => {
	console.log('MAIN ARTICLEs', articles);
	return (
		<Container sx={{ border: '1px solid red', paddingTop: '24px' }}>
			<Grid container sx={{ border: '1px solid blue' }}>
				<Grid
					container
					item
					xs={12}
					sm={6}
					md={4}
					lg={4}
					xl={4}
					sx={{
						border: '1px solid green',
						backgroundColor: 'primary.midnightBlue800',
						color: 'background.default',
						padding: '16px',
						gap: '8px',
						height: '210px',
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
							<MainArticleHeader article={articles[0]} />
							<MainArticleSupportingText article={articles[0]} />
						</Box>
						<Box>
							<MainArticleButtons article={articles[0]} />
						</Box>
					</Box>
				</Grid>

				<MainArticlePhoto article={articles[0]} />

				<MainArticleRotate />
			</Grid>
		</Container>
	);
};

export default MainArticle;
