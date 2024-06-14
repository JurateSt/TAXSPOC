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
	return (
		<Container
			sx={{
				// border: '1px solid red',
				paddingTop: '24px',
			}}
		>
			<Grid
				container
				// sx={{ border: '1px solid blue' }}
			>
				<Box
					sx={{
						// border: '3px solid green',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
						flex: '1 0 0',
						alignSelf: 'stretch',
						boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
						marginBottom: '32px',
					}}
				>
					<Grid
						container
						item
						xs={12}
						sm={6}
						md={4}
						lg={4}
						xl={4}
						sx={{
							// border: '1px solid green',
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
				</Box>

				{/* <MainArticleRotate /> */}
			</Grid>
		</Container>
	);
};

export default MainArticle;
