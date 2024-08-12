// React
import React, { useState, useEffect, useRef } from 'react';
// MUI
import { Container, Box, Grid } from '@mui/material';
// api
import api from '../../api/axios';

// components
import MainArticlePhoto from './MainArticlePhoto';
import MainArticleHeader from './MainArticleHeader';
import MainArticleSupportingText from './MainArticleSupportingText';
import MainArticleButtons from './MainArticleButtons';
import MainArticleSubHeader from './MainArticleSubHeader';

const MainArticle = ({ article }) => {
	return (
		<Grid
			container
			item
			xs={12}
			columnSpacing={2}
			sx={
				{
					// border: '2px solid green',
				}
			}
		>
			<Grid container item xs={12} sm={6} md={4} lg={4} xl={4}>
				<Grid
					// container
					item
					xs={12}
					sx={{
						borderBottom: '1px solid',
						borderColor: 'primary.divider',
						// border: '2px solid red',
					}}
				>
					<Grid
						container
						// rowSpacing between MainArticleSubHeader, MainArticleHeader, MainArticleSupportingText
						rowSpacing={1}
						item
						xs={12}
						sx={
							{
								// border: '2px solid blue',
							}
						}
					>
						<MainArticleSubHeader article={article} />
						<MainArticleHeader article={article} />
						<MainArticleSupportingText article={article} />
					</Grid>
				</Grid>
			</Grid>

			<Grid
				item
				xs={12}
				sm={6}
				md={8}
				lg={8}
				xl={8}
				sx={{
					// border: '1px solid green',
					// backgroundColor: 'lightblue',
					// height: '180px',
					// height: '295px',
					// cursor: 'pointer',
					'&:hover a': {
						opacity: 0.7,
						// transition: 'opacity 0.3s ease-in-out',
					},
					order: { xs: 1, sm: 2 },
				}}
			>
				<MainArticlePhoto article={article} />
			</Grid>
		</Grid>
	);
};

export default MainArticle;
