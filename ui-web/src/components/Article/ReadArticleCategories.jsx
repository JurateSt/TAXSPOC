// MUI
import { Typography, Grid, Box, Button, Chip } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const ReadArticleCategories = ({ article }) => {
	console.log('ReadArticleCategories: ', article.categories);
	return (
		<>
			<Grid
				item
				xs={12}
				sx={
					{
						// border: '1px solid green',
					}
				}
			>
				<Typography>Topics</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sx={{
					display: 'flex',
					// alignItems: 'flex-start',
					justifyContent: 'space-between',
					gap: '12px',
					flexWrap: 'wrap',
				}}
			>
				{article?.categories?.map((item, index) => (
					<Chip key={index} label={item?.name} />
				))}
			</Grid>
		</>
		// <Box
		// 	name="categories-and-share-icons"
		// 	sx={{
		// 		display: 'flex',
		// 		padding: '8px 16px',
		// 		flexDirection: 'column',
		// 		width: '100%',
		// 	}}
		// >
		// 	<Box
		// 		name="heading"
		// 		sx={{
		// 			display: 'flex',
		// 			padding: '4px 0',
		// 			justifyContent: 'space-between',
		// 			alignItems: 'flex-end',
		// 			alignSelf: 'stretch',
		// 		}}
		// 	>
		// 		<Typography>Topics</Typography>
		// 	</Box>
		// 	<Box
		// 		name="buttons"
		// 		sx={{
		// 			display: 'flex',
		// 			// padding: '4px 16px',
		// 			alignItems: 'center',
		// 		}}
		// 	>
		// 		<Box name="categories" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
		// 			{article?.categories?.map((item, index) => (
		// 				<Chip key={index} label={item?.name} />
		// 			))}
		// 		</Box>
		// 		<Box
		// 			name="share-icons"
		// 			sx={{
		// 				display: 'flex',
		// 				justifyContent: 'flex-end',
		// 				alignItems: 'center',
		// 				marginLeft: 'auto',
		// 				gap: '8px',
		// 			}}
		// 		>
		// 			<ShareOutlinedIcon />
		// 		</Box>
		// 	</Box>
		// </Box>
	);
};

export default ReadArticleCategories;
